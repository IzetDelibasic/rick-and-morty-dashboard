import { Component, OnInit, OnDestroy } from '@angular/core';
import { CHARACTER_DETAILS_LABELS } from '../../../../../constants/contentConstants/characterDetailsLabels';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { Character, Episode, Location } from '../../../../../shared/models/character.model';
import * as CharactersActions from '../../../../../store/characters/actions/characters.actions';
import * as CharactersSelectors from '../../../../../store/characters/selectors/characters.selectors';
import { GenderIconPipe } from '../../../../../shared/pipes/gender-icon.pipe';
import { StatusSeverityPipe } from '../../../../../shared/pipes/status-severity.pipe';
import { StatusIconPipe } from '../../../../../shared/pipes/status-icon.pipe';
import { FormatAirDatePipe } from '../../../../../shared/pipes/format-air-date.pipe';
import { FormatEpisodePipe } from '../../../../../shared/pipes/format-episode.pipe';
import { AppearancePercentagePipe } from '../../../../../shared/pipes/appearance-percentage.pipe';
import { VisibleResidentsPipe } from '../../../../../shared/pipes/visible-residents.pipe';
import { RemainingCountPipe } from '../../../../../shared/pipes/remaining-count.pipe';
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
    GenderIconPipe,
    StatusSeverityPipe,
    StatusIconPipe,
    FormatAirDatePipe,
    FormatEpisodePipe,
    AppearancePercentagePipe,
    VisibleResidentsPipe,
    RemainingCountPipe,
  ],
  templateUrl: './character-details-page.component.html',
  styleUrl: './character-details-page.component.scss',
})
export class CharacterDetailsPageComponent implements OnInit, OnDestroy {
  character$: Observable<Character | null>;
  episodes$: Observable<Episode[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  location$: Observable<Location | null>;
  locationResidents$: Observable<Character[]>;
  locationLoading$: Observable<boolean>;
  locationError$: Observable<any>;

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
    this.location$ = this.store.select(CharactersSelectors.selectSelectedCharacterLocation);
    this.locationResidents$ = this.store.select(CharactersSelectors.selectLocationResidents);
    this.locationLoading$ = this.store.select(CharactersSelectors.selectLocationLoading);
    this.locationError$ = this.store.select(CharactersSelectors.selectLocationError);
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.characterId = parseInt(id, 10);
        this.store.dispatch(CharactersActions.loadCharacterDetails({ id: this.characterId }));
      }
    });

    this.character$.pipe(takeUntil(this.destroy$)).subscribe((character) => {
      if (character?.location?.url) {
        this.store.dispatch(
          CharactersActions.loadCharacterLocation({ locationUrl: character.location.url }),
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(CharactersActions.clearCharacterDetails());
    this.store.dispatch(CharactersActions.clearCharacterLocation());
  }

  preloadEpisodes(episodeIds: number[]): void {
    this.store.dispatch(CharactersActions.preloadEpisodes({ episodeIds }));
  }

  areEpisodesLoaded(episodeIds: number[]): Observable<boolean> {
    return this.store
      .select(CharactersSelectors.selectEpisodesCache)
      .pipe(map((cache) => episodeIds.every((id) => !!cache[id])));
  }
}
