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
  public lsContas: Conta[] = [];
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

  }
}
