import { Component } from '@angular/core';
import { LoadingController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineProvider } from '../../providers/wine.provider';
import { ModalWineFilterPage } from '../modal-wine-filter/modal-wine-filter';

@Component({
  selector: 'page-wine-refill',
  templateUrl: 'wine-refill.html'
})
export class WineRefillPage {
  
  public title: string = 'Hors stock';

  constructor(
    private modalCtrl: ModalController,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider,
    public wineProvider: WineProvider) {
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

  /**
   * Open modal to filter wines
   */
  public openModalFilter(): void {
    this.modalCtrl.create(ModalWineFilterPage).present();
  }
}
