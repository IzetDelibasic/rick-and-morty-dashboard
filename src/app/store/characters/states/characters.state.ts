import { EntityState } from '@ngrx/entity';
import { Character, Episode, Location } from '../../../shared/models/character.model';

export interface CharactersState extends EntityState<Character> {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  loading: boolean;
  error: any;
  pagesCache: { [page: number]: number[] };
  episodesCache: { [id: number]: Episode };
  selectedCharacter: Character | null;
  selectedCharacterEpisodes: Episode[];
  characterDetailsLoading: boolean;
  characterDetailsError: any;
  selectedCharacterLocation: Location | null;
  locationResidents: Character[];
  locationLoading: boolean;
  locationError: any;
}

export const initialState: CharactersState = {
  ids: [],
  entities: {},
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  nextPageUrl: null,
  prevPageUrl: null,
  loading: false,
  error: null,
  pagesCache: {},
  episodesCache: {},
  selectedCharacter: null,
  selectedCharacterEpisodes: [],
  characterDetailsLoading: false,
  characterDetailsError: null,
  selectedCharacterLocation: null,
  locationResidents: [],
  locationLoading: false,
  locationError: null,
};
