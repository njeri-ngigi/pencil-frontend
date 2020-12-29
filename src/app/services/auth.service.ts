import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['/editor']);
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }

  GoogleAuth(): any {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.angularFireAuth.signInWithRedirect(provider)
      .catch((error) => {
        console.log(error);
        window.alert('Login Failed. Please try again.');
      });
  }

  LogOut(): any {
    return this.angularFireAuth.signOut()
      .catch((error) => {
        console.log(error);
        window.alert('Logout Failed. Please try again.');
      });
  }
}
