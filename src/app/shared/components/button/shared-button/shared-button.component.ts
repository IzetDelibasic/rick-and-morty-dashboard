import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shared-button',
  imports: [CommonModule, ButtonModule],
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
})
export class SharedButtonComponent {
  @Input() label = '';
  @Input() icon: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() className = '';

  @Output() onClick = new EventEmitter<Event>();
}
