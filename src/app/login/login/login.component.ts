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
  emailVazio: boolean;
  senhaVazia: boolean;
  loginsCadastrados: string[] = [];
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
    if (localStorage.hasOwnProperty('Easy Financas Cadastro')) {
      this.loginsCadastrados = JSON.parse(localStorage.getItem('Easy Financas Cadastro') || '{}');
      console.log(this.loginsCadastrados);
      console.log(dadosFormLogin);
      this.loginsCadastrados.forEach((element) => {

        console.log(element);
      });

      if (this.loginsCadastrados.indexOf(dadosFormLogin.loginEmail) > -1 && this.loginsCadastrados.indexOf(dadosFormLogin.senha) > -1) {
        alert('SUCESSO!');
      } else {
        alert('ERRO!');
      }

    } else {
      alert('CADASTRE-SE!');
    }


    console.log(dadosFormLogin);
    // if (dadosFormLogin.loginEmail === 'teste@teste.com' && dadosFormLogin.senha === '123456') {
    //   alert('Sucesso!');
    // } else {
    //   alert('error!');
    //   this.emailVazio = true;
    //   this.senhaVazia = true;
    // }

  }
  verificaEmail(email: any) {
    console.log(email.currentTarget.value);
    if (email.currentTarget.value === '') {
      this.emailVazio = true;
    } else {
      this.emailVazio = false;
    }
  }
  verificaSenha(senha: any) {
    if (senha.currentTarget.value === '') {
      this.senhaVazia = true;
    } else {
      this.senhaVazia = false;
    }
  }

  get email() {
    return this.formLogin.get('loginEmail');
  }
  get senha() {
    return this.formLogin.get('senha');
  }
}

