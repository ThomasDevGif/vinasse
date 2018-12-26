import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wine } from '../../../models/wine';
import { WineEditPage } from '../../wine-edit/wine-edit';

@Component({
  selector: 'page-wine-details-menu',
  templateUrl: 'wine-details-menu.html',
})
export class WineDetailsMenuPage {

  private wine: Wine;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineEditPage(): void {
    this.navCtrl.push(WineEditPage, {data: this.wine});
  }

}
