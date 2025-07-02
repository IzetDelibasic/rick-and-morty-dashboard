import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './shared-dropdown.component.html',
  styleUrl: './shared-dropdown.component.scss',
})
export class SharedDropdownComponent {
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() model: any;

  @Output() modelChange = new EventEmitter<any>();
}
