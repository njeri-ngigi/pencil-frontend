import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  faPencil = faPencilAlt;
  faLogout = faPowerOff;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.LogOut();
  }
}
