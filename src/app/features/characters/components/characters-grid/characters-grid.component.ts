import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { Character } from '../../../../shared/models/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-characters-grid',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, MessageModule, CharacterCardComponent],
  templateUrl: './characters-grid.component.html',
  styleUrl: './characters-grid.component.scss',
})
export class CharactersGridComponent implements OnChanges {
  @Input() characters: Character[] = [];
  @Input() loading: boolean = false;
  @Input() error: any = null;

  @Output() characterClick = new EventEmitter<Character>();

  isTransitioning = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characters'] && !changes['characters'].firstChange) {
      this.isTransitioning = true;

      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    }
  }

  onCharacterClick(character: Character): void {
    this.characterClick.emit(character);
  }

  trackByCharacterId(index: number, character: Character): number {
    return character.id;
  }

  get gridClasses(): string {
    const classes = ['characters-grid__grid'];

    if (this.isTransitioning) {
      classes.push('page-entering');
    } else {
      classes.push('page-entered');
    }

    return classes.join(' ');
  }

  get containerClasses(): string {
    const classes = ['characters-grid'];

    if (this.loading) {
      classes.push('loading');
    }

    return classes.join(' ');
  }
}
