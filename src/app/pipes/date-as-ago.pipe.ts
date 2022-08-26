import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAsAgo'
})
export class DateAsAgoPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) { return 'a long time ago'; }

    let time = (Date.now() - +new Date(value)) / 1000;

    if (time < 10) {
      return 'Maintenant';
    } else if (time < 60) {
      return 'Ca fait un bon moment';
    }

    const divider = [60, 60, 24, 30, 12];
    const string = [' seconde', ' minute', ' heure', ' jour', ' mois', ' annee'];

    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    const plural = Math.floor(time) > 1 ? 's' : '';

    return 'Il y a ' + Math.floor(time) + string[i] + plural;
  }
}