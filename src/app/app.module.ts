import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
export const firebaseConfig = {
  apiKey: "AIzaSyDBDd1w0jNDRxW0CanVe2V_f2kgmBZV-So",
  authDomain: "athletic-organizer.firebaseapp.com",
  databaseURL: "https://athletic-organizer.firebaseio.com",
  projectId: "athletic-organizer",
  storageBucket: "athletic-organizer.appspot.com",
  messagingSenderId: "256229658893"
}
firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus
  ]
})
export class AppModule {}
