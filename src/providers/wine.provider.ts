import { Injectable } from '@angular/core';
import { Wine } from '../models/wine';

@Injectable()
export class WineProvider {

  // public wines: Wine[];
  public winesInStock: Wine[] = [];
  public winesOutOfStock: Wine[] = [];
  public wines: Wine[] = [
    {id: null, type: 'Rouge', year: 1999, designation: 'Margaux', producer: 'Cadet de Clarence', quantity: 3, comment: ''},
    {id: null, type: 'Rouge', year: 2000, designation: 'Pessace Leognan (Graves)', producer: 'Château Haut Vigneau', quantity: 4, comment: 'ok'},
    {id: null, type: 'Rouge', year: 2004, designation: 'Moulis', producer: 'Château Mauvesin', quantity: 2, comment: ''},
    {id: null, type: 'Rouge', year: 2005, designation: 'Medoc', producer: 'Château Saint Cristoly', quantity: 6, comment: ''},
    {id: null, type: 'Rouge', year: 2006, designation: 'Graves', producer: 'Château du Monastère', quantity: 6, comment: ''},
    {id: null, type: 'Rouge', year: 2006, designation: 'Medoc', producer: 'Château St-Hilaire', quantity: 0, comment: 'TB en 2018'},
    {id: null, type: 'Rouge', year: 2006, designation: 'Chateau', producer: 'St-Hilaire', quantity: 1, comment: 'top'},
    {id: null, type: 'Rouge', year: 2006, designation: 'Medoc', producer: 'Cadet St-Hilaire', quantity: 2, comment: 'Chateau'}
  ];

  constructor() {}

  /**
   * Set wines
   * @param wines Wines
   */
  public setWines(wines: Wine[]): void {
    this.wines = wines;
    // wines.forEach((wine) => {
    //   wine.quantity > 0 ? this.winesInStock.push(wine) : this.winesOutOfStock.push(wine);
    // });
    // console.log(this.winesInStock);
    // console.log(this.winesOutOfStock);
  }

  /**
   * Get the wines with quantity > 0
   */
  public getWines(): Wine[] {
    if (!this.wines) return;
    return this.wines.filter(wine => wine.quantity > 0);
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
