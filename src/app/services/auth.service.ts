import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private Afauth: AngularFireAuth) { }
  signin(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.Afauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
        console.log(user);
      }).catch(err => rejected(err));
    });
  }
}
