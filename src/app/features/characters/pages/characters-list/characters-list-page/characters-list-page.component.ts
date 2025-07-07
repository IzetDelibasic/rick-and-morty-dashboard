import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.characters$ = this.store.select(CharactersSelectors.selectCurrentPageCharacters);
    this.loading$ = this.store.select(CharactersSelectors.selectLoading);
    this.error$ = this.store.select(CharactersSelectors.selectError);
    this.currentPage$ = this.store.select(CharactersSelectors.selectCurrentPage);
    this.totalCount$ = this.store.select(CharactersSelectors.selectTotalCount);
  }

  ngOnInit(): void {
    this.store
      .select(CharactersSelectors.selectCharactersState)
      .pipe(take(1))
      .subscribe((state) => {
        const currentPage = state.currentPage;
        const hasCharactersForCurrentPage =
          state.pagesCache[currentPage] && state.pagesCache[currentPage].length > 0;
        const hasTotalCount = state.totalCount > 0;

        if (!hasCharactersForCurrentPage || !hasTotalCount) {
          this.store.dispatch(CharactersActions.loadCharacters({ page: currentPage || 1 }));
        }
      });
  }

  onPageChange(page: number): void {
    this.store.dispatch(CharactersActions.setCurrentPage({ page }));
  }

  onCharacterClick(character: Character): void {
    this.router.navigate(['/characters', character.id]);
  }
}
