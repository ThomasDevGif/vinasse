import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { WineDetailsPage } from '../wine-details/wine-details';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class WinePage {

  public message: string = 'Aucun résultat';
  // public wines: Wine[];
  public wines: Wine[] = [
    {id: 1, type: 'Rouge', year: 1996, designation: 'Bandol', producer: 'producer', quantity: 1, comment: 'comment comment comment comment comment comment...'},
    {id: 1, type: 'Rosé', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Blanc', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider) {
  }

  ionViewDidLoad() {
    this.loadWines();
  }

  /**
   * Get wines from database
   */
  public loadWines(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.getWines().then((res) => {
      this.wines = res;
      loader.dismiss();
    }).catch((error) => {
      console.log(error);
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
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
