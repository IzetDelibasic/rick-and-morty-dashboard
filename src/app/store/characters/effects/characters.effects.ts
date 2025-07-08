import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { RickMortyApiService } from '../../../shared/services/rick-morty-api.service';
import { Episode } from '../../../shared/models/character.model';
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
      withLatestFrom(this.store.select(selectCharactersState)),
      switchMap(([{ id }, state]) =>
        this.apiService.getCharacter(id).pipe(
          switchMap((character) => {
            const { episodeIds, cachedEpisodes, missingEpisodeIds } = this.splitEpisodesByCache(
              character.episode,
              state.episodesCache,
            );

            if (missingEpisodeIds.length === 0) {
              const sortedEpisodes = episodeIds
                .map((id) => cachedEpisodes.find((ep) => ep.id === id))
                .filter((ep) => ep !== undefined) as Episode[];

              return of(
                CharactersActions.loadCharacterDetailsSuccess({
                  character,
                  episodes: sortedEpisodes,
                }),
              );
            }

            return this.apiService.getEpisodes(missingEpisodeIds).pipe(
              map((newEpisodes) => {
                const newEpisodeArray = Array.isArray(newEpisodes) ? newEpisodes : [newEpisodes];
                const allEpisodes = [...cachedEpisodes, ...newEpisodeArray];
                const sortedEpisodes = episodeIds
                  .map((id) => allEpisodes.find((ep) => ep.id === id))
                  .filter((ep) => ep !== undefined) as Episode[];

                return CharactersActions.loadCharacterDetailsSuccess({
                  character,
                  episodes: sortedEpisodes,
                });
              }),
            );
          }),
          catchError((error) => of(CharactersActions.loadCharacterDetailsFailure({ error }))),
        ),
      ),
    ),
  );

  preloadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.preloadEpisodes),
      map(({ episodeIds }) => CharactersActions.loadEpisodes({ episodeIds })),
    ),
  );

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadEpisodes),
      withLatestFrom(this.store.select(selectCharactersState)),
      switchMap(([{ episodeIds }, state]) => {
        const missingEpisodeIds = episodeIds.filter((id) => !state.episodesCache[id]);

        if (missingEpisodeIds.length === 0) {
          return of(CharactersActions.loadEpisodesSuccess({ episodes: [] }));
        }

        return this.apiService.getEpisodes(missingEpisodeIds).pipe(
          map((episodes) => {
            const episodeArray = Array.isArray(episodes) ? episodes : [episodes];
            return CharactersActions.loadEpisodesSuccess({ episodes: episodeArray });
          }),
          catchError((error) => of(CharactersActions.loadEpisodesFailure({ error }))),
        );
      }),
    ),
  );

  loadCharacterLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.loadCharacterLocation),
      switchMap(({ locationUrl }) => {
        const locationId = this.extractIdFromUrl(locationUrl);

        return this.apiService.getLocation(locationId).pipe(
          switchMap((location) => {
            const residentIds = location.residents.map((url) => this.extractIdFromUrl(url));

            if (residentIds.length === 0) {
              return of(
                CharactersActions.loadCharacterLocationSuccess({
                  location,
                  residents: [],
                }),
              );
            }

            return this.apiService.getMultipleCharacters(residentIds).pipe(
              map((residents) => {
                const residentArray = Array.isArray(residents) ? residents : [residents];

                return CharactersActions.loadCharacterLocationSuccess({
                  location,
                  residents: residentArray,
                });
              }),
            );
          }),
          catchError((error) => of(CharactersActions.loadCharacterLocationFailure({ error }))),
        );
      }),
    ),
  );

  private splitEpisodesByCache(episodeUrls: string[], episodesCache: { [id: number]: Episode }) {
    const episodeIds = episodeUrls.map((url) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1]);
    });

    const cachedEpisodes: Episode[] = [];
    const missingEpisodeIds: number[] = [];

    episodeIds.forEach((episodeId) => {
      if (episodesCache[episodeId]) {
        cachedEpisodes.push(episodesCache[episodeId]);
      } else {
        missingEpisodeIds.push(episodeId);
      }
    });

    return { episodeIds, cachedEpisodes, missingEpisodeIds };
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
  }
}
