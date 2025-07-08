import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  name: 'visibleResidents',
  standalone: true,
})
export class VisibleResidentsPipe implements PipeTransform {
  transform(residents: Character[], maxCount: number = 5): Character[] {
    return residents ? residents.slice(0, maxCount) : [];
  }
}
