import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
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
}
