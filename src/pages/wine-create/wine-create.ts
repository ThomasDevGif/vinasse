import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Wine } from '../../models/wine';
import { Helper } from '../../models/helper';
import { RestProvider } from '../../providers/rest.provider';
import { WinePage } from '../wine/wine';
import { ToastProvider } from '../../providers/toast.provider';

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
    public fb: FormBuilder,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider) {
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
    // New wine object
    const wine: Wine = {
      id: null,
      type: this.typeCtrl.value,
      year: this.yearCtrl.value,
      designation: this.designationCtrl.value,
      producer: this.producerCtrl.value,
      quantity: this.quantityCtrl.value,
      comment: this.commentCtrl.value
    }

    // Loader
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();

    // Http call
    this.restProvider.createWine(wine).then((res) => {
      this.wineForm.reset();
      loader.dismiss();
      this.toastProvider.showSuccessToast('Le vin a été ajouté');
    }).catch((error) => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la création du vin');
    });
  }

}
