import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CHARACTER_CARD_LABELS } from '../../../../constants/contentConstants/characterCardLabels';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Character } from '../../../../shared/models/character.model';
import { RmButtonComponent } from '../../../../shared/components/button/rm-button/rm-button.component';
import { GenderIconPipe } from '../../../../shared/pipes/gender-icon.pipe';
import { StatusSeverityPipe } from '../../../../shared/pipes/status-severity.pipe';
import { StatusIconPipe } from '../../../../shared/pipes/status-icon.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    RmButtonComponent,
    GenderIconPipe,
    StatusSeverityPipe,
    StatusIconPipe,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Output() characterClick = new EventEmitter<Character>();

  labels = CHARACTER_CARD_LABELS;

  onViewDetails(): void {
    this.characterClick.emit(this.character);
  }
}
