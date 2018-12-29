import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Wine } from '../../models/wine';
import { Helper } from '../../models/helper';

@Component({
  selector: 'wine-form',
  templateUrl: 'wine-form.html'
})
export class WineFormComponent implements OnInit {

  @Input() public wine: Wine;
  @Output() submitFunction = new EventEmitter<Object>();

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
    this.yearCtrl = this.fb.control('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]);
    this.designationCtrl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.producerCtrl = this.fb.control('', [Validators.required, Validators.maxLength(50)]);
    this.quantityCtrl = this.fb.control('', [Validators.required, Validators.pattern('^[0-9][0-9]*$')]);
    this.commentCtrl = this.fb.control('', [Validators.maxLength(100)]);

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
   * Call function from child to parent
   */
  public submitFromComponent(): void {
    const wineData = {
      id: this.wine.id,
      type: this.typeCtrl.value,
      year: this.yearCtrl.value,
      designation: this.designationCtrl.value,
      producer: this.producerCtrl.value,
      quantity: this.quantityCtrl.value,
      comment: this.commentCtrl.value
    }

    this.submitFunction.next(wineData);
  }
}
