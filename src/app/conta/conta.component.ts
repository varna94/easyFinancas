import { BrowserModule } from '@angular/platform-browser';
import { Conta, Despesa } from './../shared/services/dashboard';
import { listaContasBanco, listaDespesas } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {
  lsContas: Conta[] = [];
  lsDespesas: Despesa[] = [];
  constructor() { }

  ngOnInit(): void {
    this.lsContas = listaContasBanco;
    this.lsDespesas = listaDespesas;
    console.log('contas');
    console.log(this.lsContas);
  }
}
