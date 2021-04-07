import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recurso, Conta } from './../shared/services/dashboard';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Pipe, PipeTransform } from '@angular/core'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {
  formAdicionarRecursos: FormGroup;
  saldo: string;
  conta: string;
  idDelete: string;
  errorDelete: boolean = false;
  successDelete: boolean = false;
  uidUserLS: any;
  listRecursos: Array<[string, any]> = [];
  public listaCB: Array<[string, any]> = [];

  constructor(public service: ApiService, private formRecurso: FormBuilder) {
    this.formAdicionarRecursos = this.formRecurso.group({
      saldo: [],
      conta: [],
      contaId: [],
      descricao: [],
      recebido: [],
      tipo: [],
      receitaFixa: [],
      repetir: [],
      periodo: [],
      dataRecebimento: [],
    });
  }

  ngOnInit(): void {
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}');
    this.getRecursos();
    this.contaInfo();
    this.criarFormRecursos();
  }
  criarFormRecursos() {
    this.formAdicionarRecursos = this.formRecurso.group({
      saldo: ['', Validators.compose([Validators.required])],
      conta: ['', Validators.compose([Validators.required])],
      contaId: [''],
      descricao: [''],
      recebido: [false, Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      receitaFixa: [false, Validators.compose([Validators.required])],
      repetir: [0],
      periodo: [''],
      dataRecebimento: [null, Validators.compose([Validators.required])],
    });
  }
  contaInfo() {
    const conta = this.service.GetContas().then(conta => {
      // this.despesas = data;
      for (let i = 0; i < conta.length; i++) {
        if (conta[i].uid === this.uidUserLS.uid) {
          this.listaCB.push(conta[i]);
        }
      }
      return conta;
    });
  }
  getRecursos() {
    var user = firebase.default.auth().currentUser;
    const recursos = this.service.Getrecursos().then(recurso => {
      for (let i = 0; i < recurso.length; i++) {
        if (recurso[i].uid === user?.uid) {
          this.listRecursos.push(recurso[i]);
          // this.serviceDb.push(conta[i]);
          console.log(this.listRecursos);
        }
      }

    });
    return recursos;
  }
  deleteInfo(id: string, saldo: string, conta: string) {
    this.idDelete = id;
    this.conta = conta;
    this.saldo = saldo;
  }
  deleteRecurso(idDel: string) {
    // idDel = '123';
    console.log('entrou delete!');
    this.service.Deleterecursos(idDel).subscribe(
      val => {
        this.successDelete = true;
        this.listRecursos = [];
        this.listaCB = [];
        this.ngOnInit();
        console.log('success - ' + val);
      },

      err => {
        this.errorDelete = true;
        console.log('error - ' + err);
      }
    );
  }
  criarRecursos() {
    var user = firebase.default.auth().currentUser;

    console.log(user)
    if (user?.uid) {
      const recurso: Recurso = {
        uid: user.uid,
        saldo: this.formAdicionarRecursos.get('saldo')?.value,
        conta: this.formAdicionarRecursos.get('conta')?.value.split('-')[0],
        contaId: this.formAdicionarRecursos.get('conta')?.value.split('-')[1],
        descricao: this.formAdicionarRecursos.get('descricao')?.value,
        recebido: this.formAdicionarRecursos.get('recebido')?.value,
        tipo: this.formAdicionarRecursos.get('tipo')?.value,
        receitaFixa: this.formAdicionarRecursos.get('receitaFixa')?.value,
        repetir: this.formAdicionarRecursos.get('repetir')?.value,
        periodo: this.formAdicionarRecursos.get('periodo')?.value,
        dataRecebimento: this.formAdicionarRecursos.get('dataRecebimento')?.value
      }
      this.service.Addrecursos(recurso, 'recursos').subscribe(
        value => {
          this.listRecursos = [];
          this.listaCB = [];
          this.ngOnInit();
          console.log("sucess")
        },

        err => console.log('error')
      );
      return 'success';
    } else {
      alert("usuario n logado");
      return false;
    }

  }
  zerarVariaveis() {
    this.successDelete = false;
    this.errorDelete = false;
  }
}
