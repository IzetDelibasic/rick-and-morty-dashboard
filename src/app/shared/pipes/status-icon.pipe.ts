import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusIcon',
  standalone: true,
})
export class StatusIconPipe implements PipeTransform {
  transform(status: string): string {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'pi pi-heart';
      case 'dead':
        return 'pi pi-times';
      default:
        return 'pi pi-question';
    }
  }
}
