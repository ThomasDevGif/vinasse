import { Injectable } from '@angular/core';
import { Wine } from '../models/wine';
import { Helper } from '../models/helper';

@Injectable()
export class WineProvider {

  // public wines: Wine[];
  public wines: Wine[] = [
    {id: null, type: '1-Rouge', year: 1999, preservationTime: 1, designation: 'Margaux', producer: 'Cadet de Clarence', quantity: 3, comment: ''},
    {id: null, type: '1-Rouge', year: 1999, preservationTime: 2, designation: 'Margaux Test', producer: 'Test de Clarence', quantity: 0, comment: ''},
    {id: null, type: '1-Rouge', year: 2000, preservationTime: 3, designation: 'Pessace Leognan (Graves)', producer: 'Château Haut Vigneau', quantity: 4, comment: 'ok'},
    {id: null, type: '1-Rouge', year: 2004, preservationTime: 7, designation: 'Moulis', producer: 'Château Mauvesin', quantity: 2, comment: ''},
    {id: null, type: '1-Rouge', year: 2005, preservationTime: 5, designation: 'Medoc', producer: 'Château Saint Cristoly', quantity: 6, comment: ''},
    {id: null, type: '5-Vin Pétillant', year: 2006, preservationTime: 6, designation: 'Graves', producer: 'Château du Monastère', quantity: 6, comment: ''},
    {id: null, type: '4-Rosé', year: 2006, preservationTime: 7, designation: 'Medoc', producer: 'Château St-Hilaire', quantity: 1, comment: 'TB en 2018'},
    {id: null, type: '3-Blanc Moelleux', year: 2006, preservationTime: 8, designation: 'Chateau', producer: 'St-Hilaire', quantity: 1, comment: 'top'},
    {id: null, type: '2-Blanc', year: 2006, preservationTime: 9, designation: 'Medoc', producer: 'Cadet St-Hilaire', quantity: 2, comment: 'Chateau'}
  ];

  // Filter
  public helper: Helper = new Helper();
  public selectedTypes: string[];

  constructor() {
    this.selectedTypes = this.helper.types;
  }

  /**
   * Set wines
   * @param wines Wines
   */
  public setWines(wines: Wine[]): void {
    this.wines = wines;
  }

  /**
   * Get the wines with quantity > 0
   */
  public getWines(): Wine[] {
    if (!this.wines) return [];
    return this.wines.filter((wine) => {
      if (wine.quantity > 0 && this.selectedTypes.indexOf(wine.type) > -1) return true;
    });
  }

  /**
   * Get the wines with year + preservationTime <= current year
   */
  public getWinesToDrink(): Wine[] {
    if (!this.wines) return;
    var today = new Date();
    return this.wines.filter(wine => {
      var limitYear = Number(wine.year) + Number(wine.preservationTime);

      if (wine.quantity > 0 && this.selectedTypes.indexOf(wine.type) > -1
      && (limitYear <= today.getFullYear() + 1)) return true;
      return false;
    });
  }

  /**
   * Get the wines with quantity = 0
   */
  public getWinesToRefill(): Wine[] {
    if (!this.wines) return;
    return this.wines.filter(wine => {
      if (this.selectedTypes.indexOf(wine.type) > -1 && Number(wine.quantity) == 0) return true;
      return false;
    });
  }

  /**
   * Update wine locally to prevent refresh
   */
  public updateWine(wine: Wine): void {
    if (!this.wines) return;
    let index = this.wines.findIndex(wineToUpdate => wine.id === wineToUpdate.id);
    if (index > -1) {
      this.wines.splice(index, 1, wine);
    }
  }

  /**
   * Remove the wine locally to prevent refresh
   */
  public removeWine(wine: Wine): void {
    if (!this.wines) return;
    const index = this.wines.indexOf(wine, 0);
    if (index > -1) {
      this.wines.splice(index, 1);
    }
  }

  /**
   * Calculate total of bottles
   */
  public calculateTotal(wines: Wine[]): number {
    if (!wines) return 0;
    var total = 0;
    wines.forEach(wine => {
      total += Number(wine.quantity);
    });
    return total;
  }

}
