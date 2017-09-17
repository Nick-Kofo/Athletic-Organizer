import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
              public formBuilder: FormBuilder, public toastCtrl: ToastController, public network: Network,
              public googleplus:GooglePlus)
  {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.network.onDisconnect().subscribe(() => {
      toaster.setMessage('No internet connection, please connect');
      toaster.present();
    });
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
 
  loginUser() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (!this.loginForm.valid){
      toaster.setMessage('Invalid email or password');
      toaster.present();
    } else {
      this.authservice.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          this.navCtrl.setRoot('TabsPage');
        }, error => {
          toaster.setMessage('Wrong email or password');
          toaster.present();
        }
      );
    }
  }

  googleLogin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    this.googleplus.login({
      'webClientId':'256229658893-5petnodi446fp8bca3n3pk64pos61859.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        this.navCtrl.setRoot('TabsPage');
      }).catch(ns=>{
        toaster.setMessage('Something went wrong');
        toaster.present();
      })
    })
  }
 
  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
   
  signup() {
    this.navCtrl.push('SignupPage');
  }

}
