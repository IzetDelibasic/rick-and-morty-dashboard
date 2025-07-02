import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './shared-input.component.html',
  styleUrl: './shared-input.component.scss',
})
export class SharedInputComponent {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() model: any;

  @Output() modelChange = new EventEmitter<any>();
}
