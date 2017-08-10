import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials = {} as usercreds;
  public loginForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider,
              public formBuilder: FormBuilder, public toastCtrl: ToastController) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }
 
  signin() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (!this.loginForm.valid){
      toaster.setMessage('Invalid email or password');
      toaster.present();
    } else {
        this.authservice.login(this.credentials).then((res: any) => {
        if (!res.code)
          this.navCtrl.setRoot('TabsPage');
        else
          alert(res);
      })
    }
    
  }
 
  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
   
  signup() {
    this.navCtrl.push('SignupPage');
  }

}
