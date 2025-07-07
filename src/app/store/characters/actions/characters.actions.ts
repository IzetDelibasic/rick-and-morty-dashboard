import { createAction, props } from '@ngrx/store';
import { CharacterResponse, Character, Episode } from '../../../shared/models/character.model';

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

export const loadCharacterDetails = createAction(
  '[Characters] Load Character Details',
  props<{ id: number }>(),
);

export const loadCharacterDetailsSuccess = createAction(
  '[Characters] Load Character Details Success',
  props<{ character: Character; episodes: Episode[] }>(),
);

export const loadCharacterDetailsFailure = createAction(
  '[Characters] Load Character Details Failure',
  props<{ error: any }>(),
);

export const clearCharacterDetails = createAction(
  '[Characters] Clear Character Details'
);
