import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  constructor(public afireauth: AngularFireAuth) {
  }

  /*
  Adds a new user to the system.
  Called from - signup.ts
  Inputs - The new user object containing the email, password and displayName.
  Outputs - Promise.
  */
  signupUser(email: string, password: string, displayName: string): firebase.Promise<any> {
    return this.afireauth.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: displayName,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/athletic-organizer.appspot.com/o/blank-profile-picture.png?alt=media&token=3177ba12-5794-4aa0-b3c3-edb8adc26349'
      }).then(() => {
        this.firedata.child(this.afireauth.auth.currentUser.uid).set({
          uid: this.afireauth.auth.currentUser.uid,
          displayName: displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/athletic-organizer.appspot.com/o/blank-profile-picture.png?alt=media&token=3177ba12-5794-4aa0-b3c3-edb8adc26349'
        })
      })
    });
  }

  /*
  For resetting the password of the user.
  Called from - passwordreset.ts
  Inputs - email of the user.
  Output - Promise.
  */
  passwordreset(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  /*
  For updating the users collection and the firebase users list with
  the imageurl of the profile picture stored in firebase storage.
  Called from - profilepic.ts
  Inputs - Url of the image stored in firebase.
  OUtputs - Promise.
  */
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.afireauth.auth.currentUser.updateProfile({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
            })  
    })
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
    this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
      resolve(snapshot.val());
    }).catch((err) => {
      reject(err);
      })
    })
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
      displayName: newname,
      photoURL: this.afireauth.auth.currentUser.photoURL
    }).then(() => {
      this.firedata.child(firebase.auth().currentUser.uid).update({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL,
        uid: this.afireauth.auth.currentUser.uid
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
      }).catch((err) => {
        reject(err);
    })
    })
    return promise;
  }

  getallusers() {
    var currentUser = null;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUser = user;
      }
    });
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          if (key != currentUser.uid) {
            temparr.push(userdata[key]);
          }
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}