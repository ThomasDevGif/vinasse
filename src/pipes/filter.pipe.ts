import { Pipe, PipeTransform } from '@angular/core';
import { Wine } from '../models/wine';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(wines: Wine[], filterValue: any): any {
        let filteredWines = wines.filter(wine => wine.designation.toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
        if (filteredWines.length === 0) {
            filteredWines = wines.filter(wine => wine.producer.toLowerCase().indexOf(filterValue.toLowerCase()) > -1); 
        }
        return filteredWines;
    }
}