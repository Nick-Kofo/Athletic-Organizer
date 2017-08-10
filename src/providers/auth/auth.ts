import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  constructor(public afireauth: AngularFireAuth) {
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.afireauth.auth.signInWithEmailAndPassword(email, password);
  }


}
