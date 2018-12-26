import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { WinePage } from '../pages/wine/wine';
import { WineEditPage } from '../pages/wine-edit/wine-edit';
import { WineDetailsPage } from '../pages/wine-details/wine-details';
import { WineCreatePage } from '../pages/wine-create/wine-create';
import { TabsPage } from '../pages/tabs/tabs';
import { NoResultComponent } from '../components/no-result/no-result';
import { WineFormComponent } from '../components/wine-form/wine-form';
import { RestProvider } from '../providers/rest.provider';
import { ToastProvider } from '../providers/toast.provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    WineCreatePage,
    WinePage,
    WineEditPage,
    WineDetailsPage,
    TabsPage,
    NoResultComponent,
    WineFormComponent
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
    WineEditPage,
    WineDetailsPage,
    TabsPage,
    NoResultComponent,
    WineFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    ToastProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
