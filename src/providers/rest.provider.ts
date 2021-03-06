import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wine } from '../models/wine';

@Injectable()
export class RestProvider {

  private baseUrl = './assets/server/';

  constructor(public http: HttpClient) {}

  /**
   * Add a wine in database
   * @param wine Wine to create
   */
  public createWine(wine: Wine) : Promise<any> {
    return this.http.post(this.baseUrl + 'wine/createWine.php', wine)
    .toPromise()
    .catch(this.handleError);
  }

  /**
   * Get wines from database
   */
  public getWines() : Promise<any> {
    return this.http.get(this.baseUrl + 'wine/getWines.php')
    .toPromise()
    .catch(this.handleError);
  }

  /**
   * Update a wine in database
   * @param wine Wine to update
   */
  public updateWine(wine: Wine) : Promise<any> {
    return this.http.post(this.baseUrl + 'wine/updateWine.php', wine)
    .toPromise()
    .catch(this.handleError);
  }

  /**
   * Delete a wine in database
   * @param wineId Wine's id to delete
   */
  public deleteWine(wineId: number) : Promise<any> {
    return this.http.post(this.baseUrl + 'wine/deleteWine.php', wineId)
    .toPromise()
    .catch(this.handleError);
  }

  /**
   * Generic function to reject promise
   */
  private handleError(error: any): Promise<any> {
    console.error('[ERROR] ', error);
    return Promise.reject(error.message || error);
  }

}
