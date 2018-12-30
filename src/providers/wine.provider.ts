import { Injectable } from '@angular/core';
import { Wine } from '../models/wine';
import { Helper } from '../models/helper';

@Injectable()
export class WineProvider {

  // public wines: Wine[];
  public wines: Wine[] = [
    {id: null, type: '1-Rouge', year: 1999, designation: 'Margaux', producer: 'Cadet de Clarence', quantity: 3, comment: ''},
    {id: null, type: '1-Rouge', year: 1999, designation: 'Margaux Test', producer: 'Test de Clarence', quantity: 0, comment: ''},
    {id: null, type: '1-Rouge', year: 2000, designation: 'Pessace Leognan (Graves)', producer: 'Château Haut Vigneau', quantity: 4, comment: 'ok'},
    {id: null, type: '1-Rouge', year: 2004, designation: 'Moulis', producer: 'Château Mauvesin', quantity: 2, comment: ''},
    {id: null, type: '1-Rouge', year: 2005, designation: 'Medoc', producer: 'Château Saint Cristoly', quantity: 6, comment: ''},
    {id: null, type: '5-Vin Pétillant', year: 2006, designation: 'Graves', producer: 'Château du Monastère', quantity: 6, comment: ''},
    {id: null, type: '4-Rosé', year: 2006, designation: 'Medoc', producer: 'Château St-Hilaire', quantity: 1, comment: 'TB en 2018'},
    {id: null, type: '3-Blanc Moelleux', year: 2006, designation: 'Chateau', producer: 'St-Hilaire', quantity: 1, comment: 'top'},
    {id: null, type: '2-Blanc', year: 2006, designation: 'Medoc', producer: 'Cadet St-Hilaire', quantity: 2, comment: 'Chateau'}
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
    if (!this.wines) return;
    return this.wines.filter((wine) => {
      if (wine.quantity > 0 && this.selectedTypes.indexOf(wine.type) > -1) return true;
    });
  }

  /**
   * Get the wines with quantity = 0
   */
  public getWinesToRefill(): Wine[] {
    if (!this.wines) return;
    return this.wines.filter(wine => wine.quantity === 0);
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
  public calculateTotal(): number {
    if (!this.wines) return 0;
    var total = 0;
    this.wines.forEach(wine => {
      total += Number(wine.quantity);
    });
    return total;
  }

}
