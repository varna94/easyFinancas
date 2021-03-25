import { emailVazioCad, nomeVazio, confEmailVazio, senhaVaziaCad } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, ValidatorFn, ValidationErrors, FormArray, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { Validacoes } from '../validacoes';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;
  cad: FormArray;
  // public name: string = '';
  emailVazioCad: boolean;
  confEmailVazio: boolean;
  nomeVazio: boolean;
  senhaVaziaCad: boolean;
  listaCadastros: string[] = [];

  public t = [];
  public listaCadastro: string[] = [];

  constructor(private router: Router, private fg: FormBuilder, public authService: AuthService) {

    this.formCadastro = this.fg.group({
      nome: [],
      email: [],
      confEmail: [],
      senha: []
    });
  }
  ngOnInit(): void {
    this.nomeVazio = nomeVazio;
    this.emailVazioCad = emailVazioCad;
    this.senhaVaziaCad = senhaVaziaCad;
    this.confEmailVazio = confEmailVazio;
    this.criarFormCadastro();
  };

  criarFormCadastro() {
    this.formCadastro = this.fg.group({
      nome: ['', Validators.compose([Validators.required, Validators.pattern("/[A-Z][a-z]* [A-Z][a-z]*/")])],
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      confEmail: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  // Verify Name
  verifyName(name: any) {
    if (name.currentTarget.value === '') {
      this.nomeVazio = true;
    } else {
      this.nomeVazio = false;
    }
  }

  // verify email
  verifyEmail(email: any) {
    if (email.currentTarget.value === '') {
      this.emailVazioCad = true;
    } else {
      this.emailVazioCad = false;
    }

  }
  verifyEmailKd() {
    this.emailVazioCad = false;
  }

  // Verify email confirmacao
  verifyConfEmail(confEmail: any) {
    // this.confEmailValido = true;
    if (confEmail.currentTarget.value === '') {
      this.confEmailVazio = true;
    } else {
      this.confEmailVazio = false;
    }
  }

  //Verifi Senha
  verifySenha(senha: any) {
    // this.senhaValida = true;
    if (senha.currentTarget.value === '') {
      this.senhaVaziaCad = true;
    } else {
      this.senhaVaziaCad = false;
    }
  }
  voltar() {
    this.router.navigate(['login']);
    // alert('Voltar');
  }

  get nome() {
    return this.formCadastro.get('nome');
  }
  get email() {
    return this.formCadastro.get('email');
  }
  get confEmail() {
    return this.formCadastro.get('confEmail');
  }
  get senha() {
    return this.formCadastro.get('senha');
  }
  // get cadastro() {
  //   return this.formCadastro.get('cadastro');
  // }
}
