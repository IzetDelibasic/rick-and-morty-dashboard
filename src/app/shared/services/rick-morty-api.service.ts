import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse, Character, Episode } from '../models/character.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RickMortyApiService {
  private http = inject(HttpClient);

  getCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${environment.apiBaseUrl}/character?page=${page}`);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${environment.apiBaseUrl}/character/${id}`);
  }

  getEpisodes(ids: number[]): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${environment.apiBaseUrl}/episode/${ids.join(',')}`);
  }
}
