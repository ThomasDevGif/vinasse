import { Component } from '@angular/core';

import { WinePage } from '../wine/wine';
import { WineToDrinkPage } from '../wine-todrink/wine-todrink';
import { WineRefillPage } from '../wine-refill/wine-refill';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WinePage;
  tab2Root = WineToDrinkPage;
  tab3Root = WineRefillPage;

  constructor() {

  }
}
