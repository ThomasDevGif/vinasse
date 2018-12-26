import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-wine-edit',
  templateUrl: 'wine-edit.html'
})
export class WineEditPage {

  public title: string = 'Title';
  public buttonText: string = 'Button';

  constructor(public navCtrl: NavController) {

  }

}
