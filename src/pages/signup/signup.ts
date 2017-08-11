import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

import { EmailValidator } from '../../validators/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public toastCtrl: ToastController)
  {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      displayName: ['', Validators.compose([Validators.minLength(3), Validators.required])]
    });
  }

  signupUser() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (!this.signupForm.valid){
      toaster.setMessage('Invalid email, password or display name');
      toaster.present();
    } else {
      this.userservice.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.displayName)
        .then( userData => {
          this.navCtrl.push('ProfilepicPage');
        }, error => {
          toaster.setMessage('Something went wrong');
          toaster.present();
        }
      );
    }



    // if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
    //   toaster.setMessage('All fields are required');
    //   toaster.present();
    // }
    // else if (this.newuser.password.length < 7) {
    //   toaster.setMessage('Password is not strong. Try giving more than six characters');
    //   toaster.present();
    // }
    // else {
    //   let loader = this.loadingCtrl.create({
    //     content: 'Please wait'
    //   });
    //   loader.present();
    //   this.userservice.adduser(this.newuser).then((res: any) => {
    //     loader.dismiss();
    //     if (res.success)
    //       this.navCtrl.push('ProfilepicPage');
    //     else
    //       alert('Error' + res);
    //   })
    // }
  }  

  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
