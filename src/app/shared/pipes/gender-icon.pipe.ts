import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderIcon',
  standalone: true,
})
export class GenderIconPipe implements PipeTransform {
  transform(gender: string): string {
    switch (gender?.toLowerCase()) {
      case 'male':
        return 'pi pi-mars';
      case 'female':
        return 'pi pi-venus';
      default:
        return 'pi pi-question';
    }
  }
}
