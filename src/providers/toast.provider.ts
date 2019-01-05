import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastProvider {

  constructor(private toastController: ToastController) {}

  /**
   * Generic method to create toast
   */
  private showToast(message: string, css: string, duration: number): void {
    const toast = this.toastController.create({
      message: message,
      duration: duration,
      cssClass: css,
      position: 'top'
    });
    toast.present();
  }

  /**
   * Create green toast
   * @param message Message
   */
  public showSuccessToast(message: string): void {
    this.showToast(message, 'toast-sucess', 1500);
  }

  /**
   * Create red toast
   * @param message Message
   */
  public showErrorToast(message: string): void {
    this.showToast(message, 'toast-error', 3000);
  }

}