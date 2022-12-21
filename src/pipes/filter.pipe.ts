import { Pipe, PipeTransform } from '@angular/core';
import { Wine } from '../models/wine';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  public transform(wines: Wine[], filterValue: string): Wine[] {
    if (!filterValue) {
      return wines;
    }

    const filter = {
      designation: filterValue,
      producer: filterValue,
      comment: filterValue
    };

    return wines.filter((wine: Wine) => {
      for (const key in filter) {
        if (wine[key] && wine[key].toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
          return true;
        }
      }
      return false;
    });
  }
}
