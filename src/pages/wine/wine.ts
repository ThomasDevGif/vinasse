import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineProvider } from '../../providers/wine.provider';
import { WineEditPage } from '../wine-edit/wine-edit';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class WinePage {

  public title: string = 'Vins';

  constructor(
    private navCtrl: NavController,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider,
    public wineProvider: WineProvider,) {
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
      this.wineProvider.setWines(res);
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
    });
  }

  /**
   * Open page to create a new wine in database
   */
  public openWineCreatePage() {
    this.navCtrl.push(WineEditPage, {data: new Wine(), title: 'Ajouter'});
  }

}
