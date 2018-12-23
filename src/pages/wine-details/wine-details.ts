import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { WineDetailsMenuPage } from './wine-details-menu/wine-details-menu';
import { Wine } from '../../models/wine';

@Component({
  selector: 'page-wine-details',
  templateUrl: 'wine-details.html',
})
export class WineDetailsPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  public wine: Wine;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController) {
    this.wine = navParams.get('data');
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
    let popover = this.popoverCtrl.create(WineDetailsMenuPage);
    popover.present({ev: event});
  }
}
