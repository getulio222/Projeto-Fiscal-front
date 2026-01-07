import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private router: Router, private auth: AuthService) {}

  sair() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
