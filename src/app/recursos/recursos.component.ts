import { Recurso } from './../shared/services/dashboard';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Pipe, PipeTransform } from '@angular/core'
@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {
  saldo: string;
  conta: string;
  idDelete: string;
  errorDelete: boolean = false;
  successDelete: boolean = false;
  listRecursos: Array<[string, any]> = [];
  constructor(public service: ApiService) { }

  ngOnInit(): void {
    this.getRecursos();
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
    idDel = '123';
    console.log('entrou delete!');
    this.service.Deleterecursos(idDel).subscribe(
      val => {
        this.successDelete = true;
        this.listRecursos = [];
        this.ngOnInit();
        console.log('success - ' + val);
      },

      err => {
        this.errorDelete = true;
        console.log('error - ' + err);
      }
    );
  }
  zerarVariaveis() {
    this.successDelete = false;
    this.errorDelete = false;
  }
}
