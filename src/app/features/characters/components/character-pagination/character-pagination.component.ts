import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-character-pagination',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './character-pagination.component.html',
  styleUrl: './character-pagination.component.scss',
})
export class CharacterPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalRecords: number = 0;
  @Input() rowsPerPage: number = 20;
  @Input() loading: boolean = false;

  @Output() pageChange = new EventEmitter<number>();

  onPageChange(event: any): void {
    const newPage = event.page + 1;
    this.pageChange.emit(newPage);
  }

  get first(): number {
    return (this.currentPage - 1) * this.rowsPerPage;
  }
}
