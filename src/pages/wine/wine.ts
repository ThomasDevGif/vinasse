import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Wine } from '../../models/wine';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class WinePage {

  public wines: Wine[] = [
    {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Rosé', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Blanc', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'},
    {id: 1, type: 'Rouge', year: 1996, designation: 'designation', producer: 'producer', quantity: 1, comment: 'comment...'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinePage');
  }

}
