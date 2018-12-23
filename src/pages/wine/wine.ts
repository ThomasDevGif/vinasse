import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WineDetailsPage } from '../wine-details/wine-details';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class WinePage {

  public message: string = 'Aucun résultat';
  public wines: Wine[];
  // public wines: Wine[] = [
  //   {id: 1, type: 'Rouge', year: 1996, designation: 'Bandol', producer: 'producer', quantity: 1, comment: 'comment comment comment comment comment comment...'},
  //   {id: 1, type: 'Rosé', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
  //   {id: 1, type: 'Blanc', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
  //   {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
  //   {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'}
  // ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    this.loadWines();
  }

  /**
   * Get wines from database
   */
  public loadWines(): void {
    this.restProvider.getWines().then((res) => {
      this.wines = res;
    }).catch((error) => {
      console.log(error);
    });
  }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineDetailsPage(wine: Wine): void {
    this.navCtrl.push(WineDetailsPage, {data: wine});
  }

}
