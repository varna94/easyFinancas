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

  listRecursos: Recurso[] = [];
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

}
