import { Component, OnInit, OnDestroy } from '@angular/core';
import { CHARACTER_DETAILS_LABELS } from '../../../../../constants/contentConstants/characterDetailsLabels';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { Character, Episode } from '../../../../../shared/models/character.model';
import * as CharactersActions from '../../../../../store/characters/actions/characters.actions';
import * as CharactersSelectors from '../../../../../store/characters/selectors/characters.selectors';

@Component({
  selector: 'app-character-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    MessageModule,
    ButtonModule,
    TagModule,
    CardModule,
  ],
  templateUrl: './character-details-page.component.html',
  styleUrl: './character-details-page.component.scss',
})
export class CharacterDetailsPageComponent implements OnInit, OnDestroy {
  character$: Observable<Character | null>;
  episodes$: Observable<Episode[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  labels = CHARACTER_DETAILS_LABELS;

  private destroy$ = new Subject<void>();
  private characterId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.character$ = this.store.select(CharactersSelectors.selectSelectedCharacter);
    this.episodes$ = this.store.select(CharactersSelectors.selectSelectedCharacterEpisodes);
    this.loading$ = this.store.select(CharactersSelectors.selectCharacterDetailsLoading);
    this.error$ = this.store.select(CharactersSelectors.selectCharacterDetailsError);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.characterId = parseInt(id, 10);
        this.store.dispatch(CharactersActions.loadCharacterDetails({ id: this.characterId }));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(CharactersActions.clearCharacterDetails());
  }

  getStatusSeverity(
    status: string,
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'contrast';
    }
  }

  getGenderIcon(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'pi pi-mars';
      case 'female':
        return 'pi pi-venus';
      default:
        return 'pi pi-question';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'pi pi-heart';
      case 'dead':
        return 'pi pi-times';
      default:
        return 'pi pi-question';
    }
  }

  formatEpisodeCode(episode: string): string {
    const match = episode.match(/S(\d+)E(\d+)/);
    if (match) {
      return `Season ${parseInt(match[1])} | Episode ${parseInt(match[2])}`;
    }
    return episode;
  }

  formatAirDate(airDate: string): string {
    try {
      return new Date(airDate).toLocaleDateString('en-GB').replaceAll('/', '-');
    } catch {
      return airDate;
    }
  }

  calculateAppearancePercentage(episodes: Episode[], totalEpisodes: number = 51): number {
    return Math.round((episodes.length / totalEpisodes) * 100);
  }
}
