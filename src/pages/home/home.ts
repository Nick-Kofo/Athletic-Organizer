import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public googleplus:GooglePlus) {

  }

  login() {
    this.googleplus.login({
      'webClientId': '256229658893-5petnodi446fp8bca3n3pk64pos61859.apps.googleusercontent.com',
      'offline': true
    }).then(res=>{
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success=>{
          alert('Login success')
        }).catch(fail=>{
          alert('Login failed')
        })
    }
  

}
