import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(private toastController: ToastController) {}

  /**
   * Generic method to create toast
   * @param message Message
   */
  private showToast(message: string, css: string): void {
    const toast = this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: css
    });
    toast.present();
  }

  /**
   * Create green toast
   * @param message Message
   */
  public showSuccessToast(message: string): void {
    this.showToast(message, 'toast-sucess');
  }

  /**
   * Create red toast
   * @param message Message
   */
  public showErrorToast(message: string): void {
    this.showToast(message, 'toast-error');
  }

}