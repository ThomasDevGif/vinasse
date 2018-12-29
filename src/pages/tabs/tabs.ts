import { Component } from '@angular/core';

import { WinePage } from '../wine/wine';
import { WineCreatePage } from '../wine-create/wine-create';
import { WineRefillPage } from '../wine-refill/wine-refill';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WinePage;
  tab2Root = WineCreatePage;
  tab3Root = WineRefillPage;

  constructor() {

  }
}
