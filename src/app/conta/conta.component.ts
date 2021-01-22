import { Conta } from './../shared/services/dashboard';
import { listaContasBanco } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements OnInit {
  lsContas: Conta[] = [];
  constructor() { }

  ngOnInit(): void {
    this.lsContas = listaContasBanco;
  }

}
