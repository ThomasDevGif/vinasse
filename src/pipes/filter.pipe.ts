import { Pipe, PipeTransform } from '@angular/core';
import { Wine } from '../models/wine';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {

    public transform(wines: Wine[], filterValue: any): any {
        var filter = {
            designation: filterValue,
            producer: filterValue,
            comment: filterValue
        };

        return wines.filter((wine) => {
            for (var key in filter) {
                if (!filterValue) return true;
                if (filterValue && wine[key].toLowerCase().indexOf(filterValue.toLowerCase()) > -1) return true;
            }
            return false;
        });
    }
}