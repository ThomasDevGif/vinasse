import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { WinePage } from '../pages/wine/wine';
import { WineDetailsPage } from '../pages/wine-details/wine-details';
import { WineDetailsMenuPage } from '../pages/wine-details/wine-details-menu/wine-details-menu';
import { WineCreatePage } from '../pages/wine-create/wine-create';
import { TabsPage } from '../pages/tabs/tabs';
import { NoResultComponent } from '../components/no-result/no-result';
import { RestProvider } from '../providers/rest.provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    WineCreatePage,
    WinePage,
    WineDetailsPage,
    WineDetailsMenuPage,
    TabsPage,
    NoResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    WineCreatePage,
    WinePage,
    WineDetailsPage,
    WineDetailsMenuPage,
    TabsPage,
    NoResultComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
