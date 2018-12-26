import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { WineDetailsMenuPage } from './wine-details-menu/wine-details-menu';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';

@Component({
  selector: 'page-wine-details',
  templateUrl: 'wine-details.html',
})
export class WineDetailsPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  public wine: Wine;
  public currentQuantity: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider) {

    this.wine = navParams.get('data');
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
   * Open context menu to manager wine card
   * @param event Event
   */
  public openWineMenu(event: any): void {
    let popover = this.popoverCtrl.create(WineDetailsMenuPage, {data: this.wine});
    popover.present({ev: event});
  }

  /**
   * Save wine new quantity
   */
  public saveWine(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.updateWine(this.wine).then((res) => {
      console.log(res);
      this.currentQuantity = this.wine.quantity;
      loader.dismiss();
    }).catch((error) => {
      console.log(error);
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la sauvegarde du vin');
    });
  }
}
