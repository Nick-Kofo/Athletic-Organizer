import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,
              public events: Events) {
  }


  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }

  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }

}