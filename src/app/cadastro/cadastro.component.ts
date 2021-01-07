import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, ValidatorFn, ValidationErrors, FormArray, ControlContainer } from '@angular/forms';
import { Router } from '@angular/router';
import { Validacoes } from '../validacoes';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;
  cad: FormArray;
  // public name: String = '';
  emailVazio: boolean;
  confEmailVazio: boolean;
  nomeVazio: boolean;
  senhaVazia: boolean;
  listaCadastros: string[] = [];

  public t = [];
  public listaCadastro: string[] = [];

  constructor(private router: Router, private fg: FormBuilder) {

    this.formCadastro = this.fg.group({
      nome: [],
      email: [],
      confEmail: [],
      senha: []
    });

  }

  ngOnInit(): void {

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
  lista() {

    // this.formCadastro.controls['cadastro'].push(this.formCadastro);
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
      this.emailVazio = true;
    } else {
      this.emailVazio = false;
    }

  }
  verifyEmailKd() {
    this.emailVazio = false;
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
  verifyKeydownConfEmail(confEmail: any) {

  }


  //Verifi Senha
  verifySenha(senha: any) {
    // this.senhaValida = true;
    if (senha.currentTarget.value === '') {
      this.senhaVazia = true;
    } else {
      this.senhaVazia = false;
    }
  }
  cadastrar() {
    var cadastros = this.formCadastro.value;
    if (localStorage.hasOwnProperty('Easy Financas Cadastro')) {
      this.listaCadastros = JSON.parse(localStorage.getItem('Easy Financas Cadastro') || '{}');

      this.listaCadastros.push(cadastros);

      localStorage.setItem('Easy Financas Cadastro', JSON.stringify(this.listaCadastros));
    } else {
      console.log(cadastros);

      this.listaCadastro.push(cadastros);

      console.log(this.listaCadastro);
      localStorage.setItem('Easy Financas Cadastro', JSON.stringify(this.listaCadastro));
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
