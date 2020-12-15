import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) { }
  cadastro() {
    this.router.navigate(['cadastro']);
  }
  login() {
    this.router.navigate(['dashboard']);
  }
}
