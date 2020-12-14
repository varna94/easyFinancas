import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  // public name: String = '';
  public emailValido: boolean = true;
  public nomeValido: boolean = true;
  public senhaValida: boolean = true;
  public confEmailValido: boolean = true;
  public emailValidoRegx: boolean = true;
  emailConf: any;
  public confEmail: any;
  constructor(private router: Router) { }
  ngOnInit(): void { };
  // Verify Name
  verifyName(name: any) {
    if (name.currentTarget.value === '') {
      this.nomeValido = false;
    } else {
      this.nomeValido = true;
    }
  }
  verifyKeydownName(name: any) {
    // this.nomeValido = true;
    if (name.currentTarget.value === '') {
      // this.nomeValido = false;
    } else {
      this.nomeValido = true;
    }
  }
  // verify email
  verifyEmail(email: any) {
    let reg: any = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
    this.emailConf = email.currentTarget.value;
    // this.emailValido = true;
    this.confEmail = new FormControl('', [
      Validators.required,
      Validators.pattern('/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i')
    ]);
    console.log('pattern: ', this.confEmail.hasError('pattern'));
    console.log('required: ', this.confEmail.hasError('required'));
    console.log('Erros: ', this.confEmail.errors);
    if (email.currentTarget.value === '') {
      this.emailValido = false;

    } else {
      if (reg.test(email.currentTarget.value)) {
        this.emailValidoRegx = false;
      } else {
        this.emailValidoRegx = true;
      }
      //  this.emailValido = true;
    }


  }
  verifyKeydownEmail(email: any) {
    // this.emailValido = true;
    if (email.currentTarget.value === '') {
      // this.emailValido = false;
    } else {
      this.emailValido = true;
    }
  }


  // Verify email confirmacao
  verifyConfEmail(confEmail: any) {
    // this.confEmailValido = true;
    if (confEmail.currentTarget.value !== this.emailConf) {
      this.confEmailValido = false;
    } else {
      this.confEmailValido = true;
    }
  }
  verifyKeydownConfEmail(confEmail: any) {
    // this.confEmailValido = true;
    if (confEmail.currentTarget.value !== this.emailConf) {
      this.confEmailValido = false;
    } else {
      this.confEmailValido = true;
    }
  }


  //Verifi Senha
  verifySenha(senha: any) {
    // this.senhaValida = true;
    if (senha.currentTarget.value === '') {
      this.senhaValida = false;
    } else {
      this.senhaValida = true;
    }
  }

  cadastrar() {
    // console.log('name - ' + this.name);
    // alert('Cadastrado');
  }
  voltar() {
    this.router.navigate(['login']);
    // alert('Voltar');
  }
}
