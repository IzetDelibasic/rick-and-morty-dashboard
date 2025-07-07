import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Character } from '../../../../../shared/models/character.model';
import { CharactersGridComponent } from '../../../components/characters-grid/characters-grid.component';
import { CharacterPaginationComponent } from '../../../components/character-pagination/character-pagination.component';
import * as CharactersActions from '../../../../../store/characters/actions/characters.actions';
import * as CharactersSelectors from '../../../../../store/characters/selectors/characters.selectors';

@Component({
  selector: 'app-characters-list-page',
  standalone: true,
  imports: [CommonModule, CharactersGridComponent, CharacterPaginationComponent],
  templateUrl: './characters-list-page.component.html',
  styleUrl: './characters-list-page.component.scss',
})
export class CharactersListPageComponent implements OnInit {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  currentPage$: Observable<number>;
  totalCount$: Observable<number>;

  constructor(private store: Store) {
    this.characters$ = this.store.select(CharactersSelectors.selectCurrentPageCharacters);
    this.loading$ = this.store.select(CharactersSelectors.selectLoading);
    this.error$ = this.store.select(CharactersSelectors.selectError);
    this.currentPage$ = this.store.select(CharactersSelectors.selectCurrentPage);
    this.totalCount$ = this.store.select(CharactersSelectors.selectTotalCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CharactersActions.loadCharacters({ page: 1 }));
  }

  onPageChange(page: number): void {
    this.store.dispatch(CharactersActions.setCurrentPage({ page }));
  }
}
