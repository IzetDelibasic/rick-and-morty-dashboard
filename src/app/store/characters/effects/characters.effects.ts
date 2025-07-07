import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { RickMortyApiService } from '../../../shared/services/rick-morty-api.service';
import * as CharactersActions from '../actions/characters.actions';
import { selectCharactersState } from '../selectors/characters.selectors';

@Injectable()
export class CharactersEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private apiService = inject(RickMortyApiService);

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacters),
      withLatestFrom(this.store.select(selectCharactersState)),
      filter(([{ page = 1 }, state]) => {
        return !state.pagesCache[page];
      }),
      switchMap(([{ page = 1 }]) =>
        this.apiService.getCharacters(page).pipe(
          map((response) => CharactersActions.loadCharactersSuccess({ response, page })),
          catchError((error) => of(CharactersActions.loadCharactersFailure({ error }))),
        ),
      ),
    ),
  );

  setCurrentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.setCurrentPage),
      withLatestFrom(this.store.select(selectCharactersState)),
      map(([{ page }, state]) => {
        if (state.pagesCache[page]) {
          return CharactersActions.setCurrentPageFromCache({ page });
        }
        return CharactersActions.loadCharacters({ page });
      }),
    ),
  );

  loadCharacterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacterDetails),
      switchMap(({ id }) =>
        this.apiService.getCharacter(id).pipe(
          switchMap((character) => {
            const episodeIds = character.episode.map((url) => {
              const parts = url.split('/');
              return parseInt(parts[parts.length - 1]);
            });

            return this.apiService.getEpisodes(episodeIds).pipe(
              map((episodes) => {
                const episodeArray = Array.isArray(episodes) ? episodes : [episodes];
                return CharactersActions.loadCharacterDetailsSuccess({
                  character,
                  episodes: episodeArray,
                });
              }),
            );
          }),
          catchError((error) => of(CharactersActions.loadCharacterDetailsFailure({ error }))),
        ),
      ),
    ),
  );
}
