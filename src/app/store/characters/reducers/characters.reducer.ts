import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Character, Episode } from '../../../shared/models/character.model';
import * as CharactersActions from '../actions/characters.actions';

export interface CharactersState extends EntityState<Character> {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  loading: boolean;
  error: any;
  pagesCache: { [page: number]: number[] };
  selectedCharacter: Character | null;
  selectedCharacterEpisodes: Episode[];
  characterDetailsLoading: boolean;
  characterDetailsError: any;
}

export const adapter: EntityAdapter<Character> = createEntityAdapter<Character>();

export const initialState: CharactersState = adapter.getInitialState({
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  loading: false,
  error: null,
  pagesCache: {},
  selectedCharacter: null,
  selectedCharacterEpisodes: [],
  characterDetailsLoading: false,
  characterDetailsError: null,
});

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

  on(CharactersActions.loadCharacterDetailsSuccess, (state, { character, episodes }) => ({
    ...state,
    selectedCharacter: character,
    selectedCharacterEpisodes: episodes,
    characterDetailsLoading: false,
    characterDetailsError: null,
  })),

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
);
