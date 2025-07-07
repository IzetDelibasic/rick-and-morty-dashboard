import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'rm-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './rm-button.component.html',
  styleUrls: ['./rm-button.component.scss'],
})
export class RmButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() size?: 'small' | 'large';
  @Input() severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';
  @Input() variant?: 'outlined' | 'text';
  @Input() customClass: string = '';

  @Output() click = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}
