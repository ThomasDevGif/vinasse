import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';

@Component({
  selector: 'page-wine-edit',
  templateUrl: 'wine-edit.html'
})
export class WineEditPage {

  public wine: Wine;
  public title: string;
  public buttonText: string = 'Button';

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider) {

    this.title = navParams.get('title');
    this.wine = navParams.get('data');
  }

  /**
   * Submit form data to server
   */
  public submit($event): void {
    const wine = $event;
    if (this.title === 'Modifier') {
      this.updateWine(wine);
    } else {
      this.duplicateWine(wine);
    }
  }

  /**
   * Update wine in database
   * @param wine Wine to update
   */
  private updateWine(wine: Wine): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.updateWine(wine).then((res) => {
      loader.dismiss();
      this.toastProvider.showSuccessToast('Le vin a été modifié');
      this.navCtrl.pop();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la modification du vin');
    });
  }

  /**
   * Duplicate wine in database
   * @param wine Wine to duplicate
   */
  private duplicateWine(wine: Wine): void {
    wine.id = null; // does not create new wine if id not null
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.createWine(wine).then((res) => {
      loader.dismiss();
      this.toastProvider.showSuccessToast('Le vin a été ajouté');
      this.navCtrl.pop();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la création du vin');
    });
  }
}
