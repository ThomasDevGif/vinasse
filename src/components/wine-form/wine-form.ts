import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Wine } from '../../models/wine';
import { Helper } from '../../models/helper';

@Component({
  selector: 'wine-form',
  templateUrl: 'wine-form.html'
})
export class WineFormComponent implements OnInit {

  @Input() public wine: Wine;

  public helper: Helper = new Helper();

  public wineForm: FormGroup;
  public typeCtrl: FormControl;
  public yearCtrl: FormControl;
  public designationCtrl: FormControl;
  public producerCtrl: FormControl;
  public quantityCtrl: FormControl;
  public commentCtrl: FormControl;

  constructor(public fb: FormBuilder) {
    this.initializeForm();
  }

  public ngOnInit(): void {
    if (this.wine) {
      this.fillFormData();
    }
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
   * Fill fom with wine data
   */
  public fillFormData(): void {
    this.typeCtrl.setValue(this.wine.type);
    this.yearCtrl.setValue(this.wine.year);
    this.designationCtrl.setValue(this.wine.designation);
    this.producerCtrl.setValue(this.wine.producer);
    this.quantityCtrl.setValue(this.wine.quantity);
    this.commentCtrl.setValue(this.wine.comment);
  }

  /**
   * Send form data to server
   */
  public submit(): void {
    
  }

}
