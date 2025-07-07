import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CHARACTER_CARD_LABELS } from '../../../../constants/contentConstants/characterCardLabels';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Character } from '../../../../shared/models/character.model';
import { RmButtonComponent } from '../../../../shared/components/button/rm-button/rm-button.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, RmButtonComponent],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Output() characterClick = new EventEmitter<Character>();

  labels = CHARACTER_CARD_LABELS;

  getStatusSeverity(): 'success' | 'danger' | 'secondary' {
    switch (this.character.status) {
      case 'Alive':
        return 'success';
      case 'Dead':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  getStatusIcon(): string {
    switch (this.character.status) {
      case 'Alive':
        return 'pi pi-check-circle';
      case 'Dead':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-question-circle';
    }
  }

  getGenderIcon(): string {
    switch (this.character.gender.toLowerCase()) {
      case 'male':
        return 'pi pi-user';
      case 'female':
        return 'pi pi-user-plus';
      default:
        return 'pi pi-question';
    }
  }

  onViewDetails(): void {
    this.characterClick.emit(this.character);
  }
}
