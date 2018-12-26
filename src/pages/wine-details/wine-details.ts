import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineEditPage } from '../wine-edit/wine-edit';

@Component({
  selector: 'page-wine-details',
  templateUrl: 'wine-details.html',
})
export class WineDetailsPage {

  private parentPage: any;
  public wine: Wine;
  public currentQuantity: number;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider,
    private actionSheetCtrl: ActionSheetController) {
    
    this.parentPage = navParams.get('parentPage');
    this.wine = navParams.get('data');
    this.currentQuantity = this.wine.quantity;
  }

  ionViewWillLeave() {
    this.parentPage.loadWines();
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
    this.restProvider.updateWine(this.wine).then((res) => {
      this.currentQuantity = this.wine.quantity;
      loader.dismiss();
    }).catch((error) => {
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
    this.restProvider.deleteWine(this.wine.id).then((res) => {
      loader.dismiss();
      this.navCtrl.pop();
      this.toastProvider.showSuccessToast('Le vin a été supprimé');
    }).catch((error) => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la suppression du vin');
    });
  }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineEditPage(title: string): void {
    this.navCtrl.push(WineEditPage, {data: this.wine, title: title});
  }
}
