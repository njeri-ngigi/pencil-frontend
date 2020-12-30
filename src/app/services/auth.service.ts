import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user';
import { Observable } from 'rxjs';

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
        this.router.navigate(['/']);
      }
    });
  }



  GoogleAuth(): Observable<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();

    return new Observable((observer) => {
      this.angularFireAuth.signInWithRedirect(provider)
      .catch((error) => {
        console.error(error);
        window.alert('Login Failed. Please try again.');
        observer.next(false);
      });
    });
  }

  LogOut(): void {
    this.angularFireAuth.signOut()
    .catch((error) => {
      console.error(error);
      window.alert('Logout Failed. Please try again.');
    });

    localStorage.removeItem('isLoggingIn');
    localStorage.removeItem('user');
  }

  getLoggedInUser(): User {
    const loggedInUser = localStorage.getItem('user') || '{}';
    return JSON.parse(loggedInUser);
  }
}
