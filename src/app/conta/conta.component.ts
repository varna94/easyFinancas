import { BrowserModule } from '@angular/platform-browser';
import { Conta, Despesa } from './../shared/services/dashboard';
import { listaContasBanco, listaDespesas } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../api.service';
@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {
  public lsContas: Array<[string, any]> = [];
  public lsDespesas: Despesa[] = [];
  public uidUserLS: any;

  constructor(public apService: ApiService) { }

  ngOnInit(): void {
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}');
    console.log('init');
    const conta = this.apService.GetContas().then(conta => {
      // this.despesas = data;
      for (let i = 0; i < conta.length; i++) {
        if (conta[i].uid === this.uidUserLS.uid) {

          this.lsContas.push(conta[i]);
          console.log(this.lsContas);
        }
      }
      return conta;
    });
    this.getDespesasConta(this.lsContas);

  }

  getDespesasConta(contas: Array<[string, any]>) {
    console.log('entrou get despesa');
    console.log(contas);
    const desp = this.apService.GetDespesas().then(desp => {
      // this.despesas = data;
      for (let i = 0; i < desp.length; i++) {
        console.log(desp[i]);
        for (let j = 0; j < contas.length; j++) {
          console.log('contas -- ');
          console.log(contas[j]._id);
          if (desp[i].contaId === contas[j]._id) {

            this.lsDespesas.push(desp[i]);

            console.log(this.lsDespesas);
          }
        }
      }
      return desp;
    });
  }
}
