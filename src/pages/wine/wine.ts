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
    {id: null, type: 'Rouge', year: 1999, designation: 'Margaux', producer: 'Cadet de Clarence', quantity: 3, comment: ''},
    {id: null, type: 'Rouge', year: 2000, designation: 'Pessace Leognan (Graves)', producer: 'Château Haut Vigneau', quantity: 4, comment: 'ok'},
    {id: null, type: 'Rouge', year: 2004, designation: 'Moulis', producer: 'Château Mauvesin', quantity: 2, comment: ''},
    {id: null, type: 'Rouge', year: 2005, designation: 'Medoc', producer: 'Château Saint Cristoly', quantity: 6, comment: ''},
    {id: null, type: 'Rouge', year: 2006, designation: 'Graves', producer: 'Château du Monastère', quantity: 6, comment: ''},
    {id: null, type: 'Rouge', year: 2006, designation: 'Medoc', producer: 'Château St-Hilaire', quantity: 0, comment: 'TB en 2018'}
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
      this.calculateTotal();
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
    });
  }

  /**
   * Calculate total of bottles
   */
  public calculateTotal(): number {
    var total = 0;
    this.wines.forEach(wine => {
      total += Number(wine.quantity);
    });
    return total;
  }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineDetailsPage(wine: Wine): void {
    this.navCtrl.push(WineDetailsPage, {data: wine, parentPage: this});
  }

}
