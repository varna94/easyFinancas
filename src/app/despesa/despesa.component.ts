import { ApiService } from './../../api.service';
import { Despesa } from './../shared/services/dashboard';
import { listaDespesas } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit {
  public despesas: Despesa[] = [];
  constructor(public apService: ApiService) { }

  ngOnInit(): void {
    this.apService.GetDespesas();
    console.log(this.apService.GetDespesas());
    console.log(listaDespesas);
    this.despesas = listaDespesas;

  }

}
