import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IntroPage} from "../pages/intro/intro";
import {CheckListPage} from "../pages/check-list/check-list";
import {Data} from "../providers/data";
import {Storage} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    CheckListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    CheckListPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    Storage
    ]
})
export class AppModule {}
