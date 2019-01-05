import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineProvider } from '../../providers/wine.provider';

@Component({
    selector: 'page-wine-todrink',
    templateUrl: 'wine-todrink.html',
})
export class WineToDrinkPage {

  public title: string = 'A boire';

  constructor(
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider,
    public wineProvider: WineProvider
  ) {
    this.loadWines();
  }

  /**
   * Get wines from database
   */
  public loadWines(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.getWines().then((res) => {
      this.wineProvider.setWines(res);
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
    });
  }
}