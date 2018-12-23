import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { Helper } from '../../models/helper';

@Component({
  selector: 'page-wine-create',
  templateUrl: 'wine-create.html',
})
export class WineCreatePage {

  public helper: Helper = new Helper();

  public wineForm: FormGroup;
  public typeCtrl: FormControl;
  public yearCtrl: FormControl;
  public designationCtrl: FormControl;
  public producerCtrl: FormControl;
  public quantityCtrl: FormControl;
  public commentCtrl: FormControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder) {
    this.initializeForm();
  }

  /**
   * Initialize form values
   */
  public initializeForm(): void {
    this.typeCtrl = this.fb.control('', [Validators.required]);
    this.yearCtrl = this.fb.control('', [Validators.required]);
    this.designationCtrl = this.fb.control('', [Validators.required]);
    this.producerCtrl = this.fb.control('', [Validators.required]);
    this.quantityCtrl = this.fb.control('', [Validators.required]);
    this.commentCtrl = this.fb.control('', [Validators.required]);

    this.wineForm = this.fb.group({
      type: this.typeCtrl,
      year: this.yearCtrl,
      designation: this.designationCtrl,
      producer: this.producerCtrl,
      quantity: this.quantityCtrl,
      comment: this.commentCtrl
    });

    this.typeCtrl.setValue(this.helper.types[0]);
  }

  /**
   * Send wine to the server
   */
  public submitWine(): void {
    const wine: Wine = {
      id: null,
      type: this.typeCtrl.value,
      year: this.yearCtrl.value,
      designation: this.designationCtrl.value,
      producer: this.producerCtrl.value,
      quantity: this.quantityCtrl.value,
      comment: this.commentCtrl.value
    }

    // TODO send to server
    console.log(wine);
  }

}
