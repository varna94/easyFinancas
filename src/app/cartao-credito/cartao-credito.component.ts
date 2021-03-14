import { Cartao } from './../shared/services/dashboard';
import { ApiService } from './../../api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html',
  styleUrls: ['./cartao-credito.component.scss']
})
export class CartaoCreditoComponent implements OnInit {
  public formAdicionarCartao: FormGroup;

  constructor(public service: ApiService, private formCC: FormBuilder) {
    this.formAdicionarCartao = this.formCC.group({
      nome: [],
      bandeira: [],
      banco: [],
      limite: [],
      dataFechamentoFatura: [],
      dataVencimentoFatura: [],
      descricao: []
    });
  }

  ngOnInit(): void {

  }
  crirFormCartao() {
    this.formAdicionarCartao = this.formCC.group({
      nome: [''],
      bandeira: [''],
      banco: [''],
      limite: [''],
      dataFechamentoFatura: [''],
      dataVencimentoFatura: [''],
      descricao: ['']
    });
  }
  criarCartao() {
    var user = firebase.default.auth().currentUser;

    if (user?.uid) {
      const cartao: Cartao = {
        nome: this.formAdicionarCartao.get('nome')?.value,
        uid: user?.uid,
        banco: this.formAdicionarCartao.get('banco')?.value,
        bandeira: this.formAdicionarCartao.get('bandeira')?.value,
        limite: this.formAdicionarCartao.get('limite')?.value,
        dataFechamentoFatura: this.formAdicionarCartao.get('dataFechamentoFatura')?.value,
        dataVencimentoFatura: this.formAdicionarCartao.get('dataVencimentoFatura')?.value,
        descricao: this.formAdicionarCartao.get('descricao')?.value,
      }

      this.service.AddCartoes(cartao, 'cartoes').subscribe(
        value => {
          this.ngOnInit();
          console.log('success cartao!');
        },
        err => console.log('error')
      );
      return 'success'
    } else {
      alert('usuario nao logado');
      return false;
    }
  }

}
