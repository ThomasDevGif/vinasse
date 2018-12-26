import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Wine } from '../../models/wine';

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
    private navParams: NavParams) {
    this.title = navParams.get('title');
    this.wine = navParams.get('data');
  }

  
}
