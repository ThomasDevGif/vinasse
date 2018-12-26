import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { WineDetailsPage } from '../wine-details/wine-details';
import { Wine } from '../../models/wine';
import { RestProvider } from '../../providers/rest.provider';
import { ToastProvider } from '../../providers/toast.provider';

@Component({
  selector: 'page-wine',
  templateUrl: 'wine.html',
})
export class WinePage {

  public message: string = 'Aucun résultat';
  public wines: Wine[];
  // public wines: Wine[] = [
  //   {id: null, type: 'Rouge', year: 1999, designation: 'Margaux', producer: 'Cadet de Clarence', quantity: 3, comment: ''},
  //   {id: null, type: 'Rouge', year: 2000, designation: 'Pessace Leognan (Graves)', producer: 'Château Haut Vigneau', quantity: 4, comment: ''},
  //   {id: null, type: 'Rouge', year: 2004, designation: 'Moulis', producer: 'Château Mauvesin', quantity: 2, comment: ''},
  //   {id: null, type: 'Rouge', year: 2005, designation: 'Medoc', producer: 'Château Saint Cristoly', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2006, designation: 'Graves', producer: 'Château du Monastère', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2006, designation: 'Medoc', producer: 'Château St-Hilaire', quantity: 0, comment: 'TB en 2018'},
  //   {id: null, type: 'Rouge', year: 2007, designation: 'Château Neuf du Pape', producer: 'Bosquet des Papes', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2007, designation: 'Saint Emilion', producer: 'Châteayu Pontet-Fumet', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2008, designation: 'Pomerol', producer: 'Château Chantalouette', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2009, designation: 'Bordeaux', producer: 'Château de Goelane', quantity: 2, comment: 'bien en 2018, à boire'},
  //   {id: null, type: 'Rouge', year: 2009, designation: 'Volnay', producer: '1er cru Champans', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2010, designation: 'Chinon', producer: 'Le Grand Bouqueteau', quantity: 5, comment: ''},
  //   {id: null, type: 'Rouge', year: 2010, designation: 'Côteaux d\'Aix', producer: 'Château Calissanne', quantity: 1, comment: 'boîte rouge'},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Bandol', producer: 'La Roque - Tarente', quantity: 30, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Bandol', producer: 'Nartette', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Bordeaux', producer: 'Château de Lerm', quantity: 5, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Bourgogne', producer: 'Givry - Buissonnier', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Moulis', producer: 'Château Maucaillou', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Moulis', producer: 'Château Bouqueyran', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Saint Emilion', producer: 'Mallard', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Saint Emilion', producer: 'Les Tours de Belcier', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2011, designation: 'Saumur-Champigny', producer: 'Domaine La Bonnelière', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2012, designation: 'Blaye Côtes de Bordeaux', producer: 'Château La Cassagne-Boutet', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Blaye Côtes de Bordeaux', producer: 'Château La Roseraie de Galtus', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2012, designation: 'Puisseguin Saint Emilion', producer: 'Château Guibeau', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2012, designation: 'Volnay', producer: 'Bitouzet-Prieur', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2013, designation: 'Bourgogne-Santenay', producer: 'Joseph Drouhin', quantity: 2, comment: 'coffret Nicolas'},
  //   {id: null, type: 'Rouge', year: 2013, designation: 'Bourgogne-Santenay', producer: 'Camille Giroud', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2013, designation: 'Côtes de Provence', producer: 'Château des Bormettes', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2013, designation: 'Haut Médoc', producer: 'Château d\'Arcins', quantity: 1, comment: 'coffret Nicolas'},
  //   {id: null, type: 'Rouge', year: 2013, designation: 'Sévennes', producer: 'Saint Maurice - Rocamp', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Bandol', producer: 'La Roque - Les Baumes', quantity: 2, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Bourgogne-Côte Chalonnaise', producer: 'Genouilly Tastevine', quantity: 3, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Bourgogne-Givry', producer: 'Berthenet', quantity: 6, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Graves', producer: 'Château Raoul', quantity: 1, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Graves', producer: 'Château Ferrande', quantity: 1, comment: 'coffret Nicolas'},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Lussac St Emilion', producer: 'Château Bel Air', quantity: 1, comment: 'coffret Nicolas'},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Pomerol', producer: 'Chevalier de Lanezac', quantity: 2, comment: ''},
  //   {id: null, type: 'Rouge', year: 2014, designation: 'Pomerol', producer: 'Château Franc Maillet', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2015, designation: 'Palette (13)', producer: 'Château Henri Bonnaud', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Bourgogne-Côte Chalonnaise', producer: 'Berthenet', quantity: 3, comment: ''},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Côtes du Roussillon', producer: 'Domaine La Différence', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Crozes Hermitage', producer: 'Les 3 Lisses', quantity: 2, comment: ''},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Moulis', producer: 'Château Tour Granins', quantity: 2, comment: ''},
  //   {id: null, type: 'Rouge', year: 2016, designation: 'Savoie', producer: 'Mondeuse Arbin', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Rouge', year: 2018, designation: 'Medoc', producer: 'Château Loudenne', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Blanc', year: 2008, designation: 'Bourgogne-Montagny', producer: 'Montcuchot', quantity: 0, comment: ''},
  //   {id: null, type: 'Blanc', year: 2012, designation: 'Côte de Gascogne', producer: 'Tariquet', quantity: 1, comment: ''},
  //   {id: null, type: 'Blanc', year: 2014, designation: 'Bourgogne', producer: 'Viré-Clessée Vieilles Vignes', quantity: 1, comment: 'coffret Nicolas'},
  //   {id: null, type: 'Blanc', year: 2014, designation: 'Bourgogne', producer: 'la Croix des Batailles', quantity: 2, comment: 'sac noir'},
  //   {id: null, type: 'Blanc', year: 2014, designation: 'Bourgogne', producer: 'Santenay', quantity: 1, comment: 'sac noir'},
  //   {id: null, type: 'Blanc', year: 2015, designation: 'Bandol', producer: 'La Roque - Les Baumes', quantity: 3, comment: ''},
  //   {id: null, type: 'Blanc', year: 2015, designation: 'Côte de Duras', producer: 'Domaine des Allegrets', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Blanc', year: 2016, designation: 'Bandol', producer: 'La Roque - Les Baumes', quantity: 18, comment: ''},
  //   {id: null, type: 'Blanc', year: 2016, designation: 'Bourgogne-Givry', producer: 'Remoissenet', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Blanc', year: 2016, designation: 'Maury', producer: 'Fagayra', quantity: 1, comment: ''},
  //   {id: null, type: 'Blanc', year: 2016, designation: 'Sancerre', producer: 'Domaine François Le Saint', quantity: 1, comment: 'Petit Ballon'},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Bergerac', producer: 'Bergerac moelleux', quantity: 2, comment: ''},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Bourgogne', producer: 'Saint-Veran Vieilles Vignes', quantity: 1, comment: ''},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Bourgogne-Montagny', producer: 'Berthenet - Tête de Cuvée', quantity: 2, comment: ''},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Bourgogne-Montagny', producer: 'Berthenet - Vielles Vignes', quantity: 2, comment: ''},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Bourgogne-Montagny', producer: 'Berthenet - 1er cru Les Platières', quantity: 3, comment: ''},
  //   {id: null, type: 'Blanc', year: 2017, designation: 'Côtes de Provence', producer: '3 Filles', quantity: 3, comment: ''},
  //   {id: null, type: 'Moelleux-Blanc', year: 2012, designation: 'Côte de Duras', producer: 'Secret de Berticot moelleux', quantity: 4, comment: ''},
  //   {id: null, type: 'Moelleux-Blanc', year: 2014, designation: 'Montbazillac', producer: 'Château Poulvère', quantity: 4, comment: ''},
  //   {id: null, type: 'Rosé', year: 2015, designation: 'Bandol', producer: 'La Roque - Les Baumes', quantity: 6, comment: ''},
  //   {id: null, type: 'Rosé', year: 2017, designation: 'Bandol', producer: 'La Roque - Tarente', quantity: 4, comment: ''},
  //   {id: null, type: 'Rosé', year: 2017, designation: 'Bandol', producer: 'La Roque - Les Baumes', quantity: 11, comment: ''},
  //   {id: null, type: 'Vin Pétillant', year: 2011, designation: 'Crémant Bourgogne', producer: 'Berthenet - Blanc de Blanc', quantity: 6, comment: ''},
  //   {id: null, type: 'Vin Pétillant', year: 2012, designation: 'Champagne', producer: 'Oudin-Collet - Prélude millesime', quantity: 2, comment: '2016'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Malard', quantity: 1, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Oudin-Collet - Liberté Divine', quantity: 4, comment: '2016'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Alfred Rotschild', quantity: 2, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Rigot - Prestige', quantity: 3, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Rigot - Privilège de Binson', quantity: 1, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Oudin-Collet - Jour Doré', quantity: 12, comment: '2017'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Oudin-Collet - Liberté Divine', quantity: 3, comment: '2017'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Oudin-Collet - Odyssée Blanche', quantity: 3, comment: '2017'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Rigot - Quatrevaux', quantity: 6, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Trudon - Monochrome', quantity: 6, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Champagne', producer: 'Trudon - Dyade', quantity: 6, comment: '2018'},
  //   {id: null, type: 'Vin Pétillant', year: 0, designation: 'Crémant Bourgogne', producer: 'Genouilly - Prestige', quantity: 4, comment: '2018'}
  // ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    private loadingController: LoadingController,
    private toastProvider: ToastProvider) {
  }

  ionViewDidLoad() {
    this.loadWines();
  }

  /**
   * Get wines from database
   */
  public loadWines(): void {
    const loader = this.loadingController.create({content: "Chargement..."});
    loader.present();
    this.restProvider.getWines().then((res) => {
      this.wines = res;
      loader.dismiss();
    }).catch(() => {
      loader.dismiss();
      this.toastProvider.showErrorToast('Erreur lors de la récupération des vins');
    });
  }

  /**
   * Open wine details
   * @param wine Selected wine
   */
  public openWineDetailsPage(wine: Wine): void {
    this.navCtrl.push(WineDetailsPage, {data: wine, parentPage: this});
  }

}
