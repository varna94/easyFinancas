import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  verifyEmail(email: any) {
    if (email === '') {
      console.log('email vazio-- ' + JSON.stringify(email.target.value));
    } else {
      console.log('email preenchido' + JSON.stringify(email));
    }
  }
}
