import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './../shared/guard/auth.guard';
import { Conta } from './../shared/services/dashboard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formadicionarConta: FormGroup;
  constructor(public authService: AuthService, private formDasboard: FormBuilder, public afs: AngularFirestore, private router: Router) {
    this.formadicionarConta = this.formDasboard.group({
      nome: [],
      saldo: [],
      descricao: [],
      banco: [],
      tipo: [],
    });
  }

  ngOnInit(): void {

    var user = firebase.default.auth().currentUser;
    if (this.authService.isLoggedIn || user?.uid) {
      this.criarFormConta();
    } else {
      alert('usuario n logado');
      this.router.navigate(['']);
    }

  }
  criarFormConta() {
    this.formadicionarConta = this.formDasboard.group({
      nome: ['', Validators.compose([Validators.required])],
      saldo: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      banco: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
    });
  }

  criarConta() {
    var user = firebase.default.auth().currentUser;
    console.log(user)
    if (user?.uid) {
      const conta: Conta = {
        nome: this.formadicionarConta.get('nome')?.value,
        uid: user?.uid,
        banco: this.formadicionarConta.get('banco')?.value,
        saldo: this.formadicionarConta.get('saldo')?.value,
        tipo: this.formadicionarConta.get('tipo')?.value,
        descricao: this.formadicionarConta.get('descricao')?.value,
      }
      return new Promise<any>((resolver, rejeitar) => {
        this.afs
          .collection("conta")
          .add(conta)
          .then(res => {
            console.log(res);
            console.log('suceso')
          }, err => rejeitar())
          .catch((error: any) => {
            console.log(error);
          });
        console.log(conta);
      });
    } else {
      alert("usuario n logaod");
      return false;
    }


  }

}
