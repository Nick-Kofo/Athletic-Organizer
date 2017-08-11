import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  public passwordResetForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: UserProvider, public formBuilder: FormBuilder, public toastCtrl: ToastController)
  {
    this.passwordResetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  passwordReset() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (!this.passwordResetForm.valid){
      toaster.setMessage('Invalid email');
      toaster.present();
    } else {
      this.userservice.passwordreset(this.passwordResetForm.value.email)
      .then( userData => {
        toaster.setMessage('Email Sent. Please follow the instructions in the email to reset your password');
        toaster.present();
      }, error => {
        toaster.setMessage('Something went wrong');
        toaster.present();
      }
    );
      // this.userservice.passwordreset(this.email).then((res: any) => {
      //   if (res.success) {
      //     toaster.setMessage('Email Sent. Please follow the instructions in the email to reset your password.');
      //     toaster.present();
      //   }
      //   else {
      //     toaster.setMessage('Something went wrong.');
      //     toaster.present();
      //   }
      // })
    }
    
  }

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
