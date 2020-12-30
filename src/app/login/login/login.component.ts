import { Validacoes } from './../../validacoes';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loginValido: any = true;
  senhaValida: any = true;

  constructor(private router: Router, private fb: FormBuilder) {
    this.formLogin = this.fb.group({ login: [''], senha: [''] });
  }

  ngOnInit(): void {
    this.criarFormLogin();

  }

  criarFormLogin() {
    this.formLogin = this.fb.group({
      loginEmail: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    console.log(this.formLogin.get('loginEmail')?.valid);
  }

  cadastro() {
    this.router.navigate(['cadastro']);
  }

  login() {
    const dadosFormLogin = this.formLogin.value;

  }
  get email() {
    return this.formLogin.get('loginEmail');
  }
  get senha() {
    return this.formLogin.get('senha');
  }
}

