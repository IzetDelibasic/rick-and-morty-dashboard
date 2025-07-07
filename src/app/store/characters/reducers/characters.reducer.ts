import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Character } from '../../../shared/models/character.model';
import * as CharactersActions from '../actions/characters.actions';
import { initialState } from '../states/characters.state';

export const adapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const charactersReducer = createReducer(
  initialState,

  on(CharactersActions.loadCharacters, (state, { page }) => ({
    ...state,
    loading: true,
    error: null,
    currentPage: page || state.currentPage,
  })),

  on(CharactersActions.loadCharactersSuccess, (state, { response, page }) => {
    const newState = adapter.upsertMany(response.results, {
      ...state,
      loading: false,
      error: null,
      currentPage: page,
      totalPages: response.info.pages,
      totalCount: response.info.count,
      nextPageUrl: response.info.next,
      prevPageUrl: response.info.prev,
    });
    const characterIds = response.results.map((c) => c.id);
    return {
      ...newState,
      pagesCache: {
        ...newState.pagesCache,
        [page]: characterIds,
      },
    };
  }),

  on(CharactersActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CharactersActions.setCurrentPageFromCache, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(CharactersActions.loadCharacterDetails, (state) => ({
    ...state,
    characterDetailsLoading: true,
    characterDetailsError: null,
  })),

  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character, episodes }) => {
    const newEpisodesCache = { ...state.episodesCache };
    episodes.forEach((episode) => {
      newEpisodesCache[episode.id] = episode;
    });

    return {
      ...state,
      selectedCharacter: character,
      selectedCharacterEpisodes: episodes,
      episodesCache: newEpisodesCache,
      characterDetailsLoading: false,
      characterDetailsError: null,
    };
  }),

  on(CharactersActions.loadCharacterDetailsFailure, (state, { error }) => ({
    ...state,
    characterDetailsLoading: false,
    characterDetailsError: error,
  })),

  on(CharactersActions.clearCharacterDetails, (state) => ({
    ...state,
    selectedCharacter: null,
    selectedCharacterEpisodes: [],
    characterDetailsLoading: false,
    characterDetailsError: null,
  })),

  on(CharactersActions.loadEpisodesSuccess, (state, { episodes }) => {
    const newEpisodesCache = { ...state.episodesCache };
    episodes.forEach((episode) => {
      newEpisodesCache[episode.id] = episode;
    });

    return {
      ...state,
      episodesCache: newEpisodesCache,
    };
  }),

  on(CharactersActions.loadEpisodesFailure, (state, { error }) => ({
    ...state,
    characterDetailsError: error,
  })),
);
