import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAirDate',
  standalone: true,
})
export class FormatAirDatePipe implements PipeTransform {
  transform(airDate: string): string {
    try {
      return new Date(airDate).toLocaleDateString('en-GB').replaceAll('/', '-');
    } catch {
      return airDate;
    }
  }
}
