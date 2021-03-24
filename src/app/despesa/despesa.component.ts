import { ApiService } from './../../api.service';
import { Despesa } from './../shared/services/dashboard';
import { listaDespesas, DashboardComponent } from './../dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';
import { json } from 'body-parser';


@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent implements OnInit {
  public despesas: Array<[string, any]> = [];;
  public despesasLs: Despesa[] = [];
  public uidUserLS: any;
  constructor(public apService: ApiService) { }

  ngOnInit(): void {
    // let desp;
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}')
    const desp = this.apService.GetDespesas().then(data => {
      // this.despesas = data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].uid === this.uidUserLS.uid) {
          this.despesas.push(data[i]);
        }
      }
      return data;
    });

    console.log(this.despesas);

  }

  deleteDespesa(idDelete: String) {
    console.log('entrou delete!');
    this.apService.DeleteDespesas(idDelete).subscribe(
      val => {
        this.despesas = [];
        this.ngOnInit();
        console.log('success - ' + val);
      },
      err => console.log('error - ' + err)
    );
  }

}
