import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState, adapter } from '..';
import { Character } from '../../../shared/models/character.model';

export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

const { selectEntities } = adapter.getSelectors();

export const selectCurrentPage = createSelector(
  selectCharactersState,
  (state) => state.currentPage,
);

export const selectTotalCount = createSelector(selectCharactersState, (state) => state.totalCount);

export const selectLoading = createSelector(selectCharactersState, (state) => state.loading);

export const selectError = createSelector(selectCharactersState, (state) => state.error);

export const selectCurrentPageCharacters = createSelector(selectCharactersState, (state) => {
  const pageIds = state.pagesCache[state.currentPage];
  if (!pageIds) {
    return [];
  }
  const entities = selectEntities(state);
  return pageIds
    .map((id) => entities[id])
    .filter((character): character is Character => !!character);
});

export const selectSelectedCharacter = createSelector(
  selectCharactersState,
  (state) => state.selectedCharacter,
);

export const selectSelectedCharacterEpisodes = createSelector(
  selectCharactersState,
  (state) => state.selectedCharacterEpisodes,
);

export const selectCharacterDetailsLoading = createSelector(
  selectCharactersState,
  (state) => state.characterDetailsLoading,
);

export const selectCharacterDetailsError = createSelector(
  selectCharactersState,
  (state) => state.characterDetailsError,
);
