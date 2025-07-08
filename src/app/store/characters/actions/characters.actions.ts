import { createAction, props } from '@ngrx/store';
import {
  CharacterResponse,
  Character,
  Episode,
  Location,
} from '../../../shared/models/character.model';

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

export const clearCharacterDetails = createAction('[Characters] Clear Character Details');

export const loadEpisodes = createAction(
  '[Characters] Load Episodes',
  props<{ episodeIds: number[] }>(),
);

export const loadEpisodesSuccess = createAction(
  '[Characters] Load Episodes Success',
  props<{ episodes: Episode[] }>(),
);

export const loadEpisodesFailure = createAction(
  '[Characters] Load Episodes Failure',
  props<{ error: any }>(),
);

export const preloadEpisodes = createAction(
  '[Characters] Preload Episodes',
  props<{ episodeIds: number[] }>(),
);

export const loadCharacterLocation = createAction(
  '[Characters] Load Character Location',
  props<{ locationUrl: string }>(),
);

export const loadCharacterLocationSuccess = createAction(
  '[Characters] Load Character Location Success',
  props<{ location: Location; residents: Character[] }>(),
);

export const loadCharacterLocationFailure = createAction(
  '[Characters] Load Character Location Failure',
  props<{ error: any }>(),
);

export const clearCharacterLocation = createAction('[Characters] Clear Character Location');
