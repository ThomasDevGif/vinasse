import { Component } from '@angular/core';

import { WinePage } from '../wine/wine';
import { WineCreatePage } from '../wine-create/wine-create';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WinePage;
  tab2Root = WineCreatePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
