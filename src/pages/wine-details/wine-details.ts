import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineEditPage } from '../wine-edit/wine-edit';
import { WineProvider } from '../../providers/wine.provider';

@Component({
  selector: 'page-wine-details',
  templateUrl: 'wine-details.html',
})
export class WineDetailsPage {

  public wine: Wine;
  public currentQuantity: number;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider,
    private actionSheetCtrl: ActionSheetController,
    private wineProvider: WineProvider) {
    this.getParams();
  }

  /**
   * Get nav params
   */
  private getParams(): void {
    this.wine = this.navParams.get('data');
    this.currentQuantity = this.wine.quantity;
  }
  
  /**
   * Remove one bottle
   */
  public quantityLess(): void {
    this.wine.quantity = this.wine.quantity === 0 ? 0 : this.wine.quantity - 1;
  }

  /**
   * Add one bottle
   */
  public quantityMore(): void {
    this.wine.quantity++;
  }

  /**
   * Open action sheet to manage wine card
   * @param event Event
   */
  public openWineActionSheet(): void {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Modifier',
          role: 'destructive',
          icon: 'create',
          handler: () => { this.openWineEditPage('Modifier'); }
        }, {
          text: 'Dupliquer',
          icon: 'git-branch',
          handler: () => { this.openWineEditPage('Dupliquer'); }
        }, {
          text: 'Supprimer',
          icon: 'trash',
          handler: () => { this.deleteWine(); }
        }, {
          text: 'Annuler',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Save wine new quantity
   */
  public saveWine(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.updateWine(this.wine).then(() => {
      this.currentQuantity = this.wine.quantity;
      this.restProvider.updateWine(this.wine);
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la sauvegarde du vin');
    });
  }

  /**
   * Delete wine in database
   */
  public deleteWine(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.deleteWine(this.wine.id).then(() => {
      loader.dismiss();
      this.wineProvider.removeWine(this.wine);
      this.navCtrl.pop();
      this.toastProvider.showSuccessToast('Le vin a été supprimé');
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la suppression du vin');
    });
  }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineEditPage(title: string): void {
    this.navCtrl.push(WineEditPage, {data: this.wine, title: title, parentPage: this});
  }
}
