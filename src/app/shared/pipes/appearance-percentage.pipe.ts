import { Pipe, PipeTransform } from '@angular/core';
import { Episode } from '../models/character.model';

@Pipe({
  name: 'appearancePercentage',
  standalone: true,
})
export class AppearancePercentagePipe implements PipeTransform {
  transform(episodes: Episode[], totalEpisodes: number = 51): number {
    return Math.round((episodes.length / totalEpisodes) * 100);
  }
}
