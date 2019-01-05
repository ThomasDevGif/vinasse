import { Component, Input } from '@angular/core';
import { Helper } from '../../models/helper';
import { NavController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineProvider } from '../../providers/wine.provider';
import { WineDetailsPage } from '../../pages/wine-details/wine-details';
import { Wine } from '../../models/wine';

@Component({
  selector: 'wine-list',
  templateUrl: 'wine-list.html'
})
export class WineListComponent {

    @Input() public wines: Wine[];
    public message: string = "Aucun résultat";
    public searchValue: string = '';
    public helper: Helper = new Helper();

    constructor(
        private navCtrl: NavController,
        private restProvider: RestProvider,
        private loadingController: LoadingController,
        private toastProvider: ToastProvider,
        public wineProvider: WineProvider
    ) { }

    /**
     * Search wine in list
     * @param $event Search value
     */
    public filterWines($event: any) {
        this.searchValue = $event.target.value;
    }

    /**
     * Open wine details
     * @param wine Selected wine
     */
    public openWineDetailsPage(wine: Wine): void {
        this.navCtrl.push(WineDetailsPage, {data: wine});
    }

}
