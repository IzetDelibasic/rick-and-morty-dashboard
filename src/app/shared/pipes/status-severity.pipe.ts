import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSeverity',
  standalone: true,
})
export class StatusSeverityPipe implements PipeTransform {
  transform(
    status: string,
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'contrast';
    }
  }
}
