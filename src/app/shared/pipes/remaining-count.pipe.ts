import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  name: 'remainingCount',
  standalone: true,
})
export class RemainingCountPipe implements PipeTransform {
  transform(residents: Character[], maxVisible: number = 5): number {
    return residents ? Math.max(0, residents.length - maxVisible) : 0;
  }
}
