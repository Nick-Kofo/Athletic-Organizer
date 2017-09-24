import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public loadingCtrl: LoadingController, public groupservice: GroupsProvider) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }

  addgroup() {
    this.navCtrl.push('NewgroupPage');
  }

  openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push('GroupchatPage', { groupName: group.groupName });
  }

}