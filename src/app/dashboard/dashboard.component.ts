import { MatTabsModule } from '@angular/material/tabs';
import { User } from './../shared/services/user';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './../shared/guard/auth.guard';
import { Conta } from './../shared/services/dashboard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';

export let listaContasBanco: Conta[] = [];
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formadicionarConta: FormGroup;
  users: User;
  usersFilter: any;
  uidUserLS: any;
  contasBanco: any;
  listaCB: Conta[] = [];

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
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(this.uidUserLS);
    let user = firebase.default.auth().currentUser;
    if (this.authService.isLoggedIn || user?.uid || this.uidUserLS.uid) {
      this.criarFormConta();
      this.usersInfo();
      this.contaInfo();
      console.log(this.usersInfo());
    } else {
      console.log('usuario n logado');
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
  usersInfo = () => {
    // console.log('user logado - ' + this.uidUserLS);

    this.authService.getContaInfo().subscribe(res => {
      this.usersFilter = res;
      this.filterUser(this.usersFilter);
      // var teste = this.users.filter(i => i.payload.doc.data().uid == this.uidUser.uid);
      // console.log(this.filterUser(this.users.payload.doc.data().uid));
    });

  }
  filterUser(uid: any) {
    let retorno;
    for (let index = 0; index < uid.length; index++) {
      if (uid[index].payload.doc?.data().uid === this.uidUserLS.uid) {
        // console.log(uid[index].payload.doc?.data());
        this.users = uid[index].payload.doc?.data();
        console.log(this.users);
      }

    }
    // console.log(this.users);
    // console.log(this.users.displayName);
    // console.log(this.users.uid);
    return this.users;
  }
  contaInfo() {
    this.authService.getContaBancos().subscribe(res => {
      this.contasBanco = res;
      this.filterContas(this.contasBanco);
      // console.log(this.contasBanco.payload?.doc.data());
    })
  }
  filterContas(contas: any) {
    let contasX;
    for (let index = 0; index < contas.length; index++) {
      if (contas[index].payload.doc?.data().uid === this.uidUserLS.uid) {
        // console.log(uid[index].payload.doc?.data());
        listaContasBanco.push(contas[index].payload.doc?.data());
        this.listaCB.push(contas[index].payload.doc?.data());
      }

    }
    console.log(listaContasBanco);
    return listaContasBanco;

  }
}
