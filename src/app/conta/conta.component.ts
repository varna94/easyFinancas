import { BrowserModule } from '@angular/platform-browser';
import { Conta, Despesa } from './../shared/services/dashboard';
import { listaContasBanco, listaDespesas } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {

  public lsContas: Array<[string, any]> = [];
  public lsDespesas: Despesa[] = [];
  public uidUserLS: any;
  public totalDespesas: Number[] = [];
  public valoTotalDesp: any;
  public listTotalRecursos: Number[] = [];
  listRecursos: Array<[string, any]> = [];
  constructor(public apService: ApiService) { }

  ngOnInit(): void {
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}');
    console.log('init');
    const conta = this.apService.GetContas().then(conta => {
      // this.despesas = data;
      for (let i = 0; i < conta.length; i++) {
        if (conta[i].uid === this.uidUserLS.uid) {

          this.lsContas.push(conta[i]);
          // console.log(this.lsContas);
        }
      }
      return conta;
    });
    this.getRecursosConta(this.lsContas);
    this.getDespesasConta(this.lsContas);

  }
  getRecursosConta(contas: any) {
    var user = firebase.default.auth().currentUser;
    const recursos = this.apService.Getrecursos().then(recurso => {
      for (let i = 0; i < recurso.length; i++) {
        for (let j = 0; j < contas.length; j++) {
          if (recurso[i].contaId === contas[j]._id) {
            this.listRecursos.push(recurso[i]);
            this.listTotalRecursos.push(recurso[i].saldo);
            // this.serviceDb.push(conta[i]);

          }
        }
      }

    });
    console.log(this.listTotalRecursos);
    console.log(this.listRecursos);
    return recursos;
  }
  getDespesasConta(contas: any) {
    // console.log('entrou get despesa');
    // console.log(contas);
    const desp = this.apService.GetDespesas().then(desp => {
      // this.despesas = data;
      for (let i = 0; i < desp.length; i++) {
        // console.log(desp[i]);
        for (let j = 0; j < contas.length; j++) {
          if (desp[i].contaId === contas[j]._id) {
            this.lsDespesas.push(desp[i]);
            this.totalDespesas.push(Number(desp[i].valor));
          }
        }
      }
      const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
      this.valoTotalDesp = this.totalDespesas.reduce(reducer);
      // this.valoTotalDesp = String(this.valoTotalDesp);
      // console.log(this.totalDespesas.reduce(reducer));
      // console.log(this.lsDespesas);
      // console.log(this.totalDespesas);
      return desp;
    });
  }
}
