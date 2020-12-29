import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faGoogle = faGoogle;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.GoogleAuth();
  }
}
