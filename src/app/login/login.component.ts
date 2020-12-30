import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;
  faSpinner = faSnowflake;
  isLoggedIn = true;

  constructor(
    public authService: AuthService
  ) {
    const loginStatus = localStorage.getItem('isLoggingIn') || 'false';
    this.isLoggedIn = JSON.parse(loginStatus);

  }

  ngOnInit(): void {
  }

  login(): void {
    localStorage.setItem('isLoggingIn', 'true');
    this.isLoggedIn = true;
    this.authService.GoogleAuth().subscribe((loginStatus) => {
      if (!loginStatus) {
        localStorage.removeItem('isLoggingIn');
        this.isLoggedIn = false;
      }
    });
  }
}
