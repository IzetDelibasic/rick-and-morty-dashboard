import { createAction, props } from '@ngrx/store';
import { CharacterResponse } from '../../../shared/models/character.model';

export const loadCharacters = createAction(
  '[Characters] Load Characters',
  props<{ page?: number }>(),
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ response: CharacterResponse; page: number }>(),
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: any }>(),
);

export const setCurrentPage = createAction(
  '[Characters] Set Current Page',
  props<{ page: number }>(),
);

export const setCurrentPageFromCache = createAction(
  '[Characters] Set Current Page From Cache',
  props<{ page: number }>(),
);
