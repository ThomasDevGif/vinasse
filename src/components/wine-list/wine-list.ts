import { Component, Input } from '@angular/core';
import { Helper } from '../../models/helper';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';
import { WineProvider } from '../../providers/wine.provider';
import { WineDetailsPage } from '../../pages/wine-details/wine-details';
import { Wine } from '../../models/wine';
import { ModalWineFilterPage } from '../../pages/modal-wine-filter/modal-wine-filter';

@Component({
  selector: 'wine-list',
  templateUrl: 'wine-list.html'
})
export class WineListComponent {

    @Input() public wines: Wine[] = [];
    @Input() public title: string;
    public message: string = "Aucun résultat";
    public searchValue: string = '';
    public helper: Helper = new Helper();

    constructor(
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private restProvider: RestProvider,
        private loadingController: LoadingController,
        private toastProvider: ToastProvider,
        public wineProvider: WineProvider
    ) { }

    /**
     * Get wines from database
     */
    public loadWines(): void {
        const loader = this.loadingController.create({content: "Chargement..."});
        loader.present();
        this.restProvider.getWines().then((res) => {
            this.wineProvider.setWines(res);
            loader.dismiss();
        }).catch(() => {
            loader.dismiss();
            this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
        });
    }

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

    /**
     * Open modal to filter wines
     */
    public openModalFilter(): void {
        this.modalCtrl.create(ModalWineFilterPage).present();
    }

}
