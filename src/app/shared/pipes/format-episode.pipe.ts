import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatEpisodeCode',
  standalone: true,
})
export class FormatEpisodePipe implements PipeTransform {
  transform(episode: string): string {
    const match = episode.match(/S(\d+)E(\d+)/);
    if (match) {
      return `Season ${parseInt(match[1])} | Episode ${parseInt(match[2])}`;
    }
    return episode;
  }
}
