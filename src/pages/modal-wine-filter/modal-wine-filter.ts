import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Helper } from '../../models/helper';
import { WineProvider } from '../../providers/wine.provider';

@Component({
  selector: 'page-modal-wine-filter',
  templateUrl: 'modal-wine-filter.html',
})
export class ModalWineFilterPage {

  public helper: Helper = new Helper();
  public isToggled = [];
  public isToggledAll: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    public wineProvider: WineProvider
  ) {
    this.initializeForm();
  }

  /**
   * Toggle selected switch
   */
  public initializeForm(): void {
    this.wineProvider.selectedTypes.forEach((type) => {
      this.isToggled[type] = this.isChecked(type);
    });
    
    this.isToggledAll = (this.wineProvider.selectedTypes.length === this.helper.types.length);
  }

  /**
   * 
   * @param type Check if the tpe has been selected
   */
  public isChecked(type: string): boolean {
    let bool = this.wineProvider.selectedTypes.indexOf(type) > -1;
    return bool;
  }

  /**
   * Add or remove type of filter
   * @param type Selected type
   */
  public notify(type: string): void {
    if (this.isToggled[type]) {
      this.wineProvider.selectedTypes.push(type);
    } else {
      let index = this.wineProvider.selectedTypes.indexOf(type);
      if (index > -1) {
        this.wineProvider.selectedTypes.splice(index, 1);
      }
    }

    // this.isToggledAll = (this.wineProvider.selectedTypes.length === this.helper.types.length);
  }

  /**
   * Toggle all switch using a single one
   */
  public notifyAll(): void {
    this.helper.types.forEach((type) => {
      this.isToggled[type] = this.isToggledAll;
      this.isToggledAll ? this.wineProvider.selectedTypes.push(type) : this.wineProvider.selectedTypes = [] ;
    });
  }

  /**
   * Close the modal
   */
  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

}