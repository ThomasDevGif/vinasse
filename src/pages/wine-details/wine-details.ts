import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wine } from '../../models/wine';

@Component({
  selector: 'page-wine-details',
  templateUrl: 'wine-details.html',
})
export class WineDetailsPage {

  public wine: Wine;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.wine = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WineDetailsPage');
  }

}
