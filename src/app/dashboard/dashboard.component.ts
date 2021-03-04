import { DespesaComponent } from './../despesa/despesa.component';
import { ApiService } from './../../api.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from './../shared/services/user';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './../shared/guard/auth.guard';
import { Conta, Despesa } from './../shared/services/dashboard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseApp } from '@angular/fire';
export let listaContasBanco: Conta[] = [];
export let listaDespesas: any;
import * as firebase from 'firebase';
import { CommonModule } from '@angular/common';
import { rootCertificates } from 'tls';

// import { DATABASE_URL } from 'angularfire2';
// firebase.default.initializeApp();
// const db = firebase.default.firestore();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formadicionarConta: FormGroup;
  formadicionarDespesa: FormGroup;
  users: User;
  usersFilter: any;
  uidUserLS: any;
  contasBanco: any;
  despesas: any;
  contaRel: Conta;
  public lsDespesa: Despesa[] = [];
  public idConta: any;
  public listaCB: Conta[] = [];
  exibirContas: boolean;
  exibirDespesas: boolean;
  userRef: User;
  contaRef: Conta;

  constructor(public authService: AuthService, private formDasboard: FormBuilder, public afs: AngularFirestore, private router: Router, public serviceDb: ApiService, public dep: DespesaComponent) {
    this.formadicionarConta = this.formDasboard.group({
      nome: [],
      saldo: [],
      descricao: [],
      banco: [],
      tipo: [],
    });
    this.formadicionarDespesa = this.formDasboard.group({
      valor: [],
      categoria: [],
      descricao: [],
      fixa: [],
      conta: [],
      status: [],
    });
  }

  ngOnInit(): void {
    this.uidUserLS = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(this.uidUserLS);
    console.log(this.authService.isLoggedIn);
    let user = firebase.default.auth().currentUser;
    console.log(user?.uid);
    if (this.authService.isLoggedIn || user?.uid || this.uidUserLS.uid) {
      this.criarFormConta();
      this.criarFormDespesa();
      this.usersInfo();
      this.contaInfo();
      // this.buscarDespesas();

      console.log('despesas mongoDB');
      console.log(this.serviceDb.GetDespesas());
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
  criarFormDespesa() {
    this.formadicionarDespesa = this.formDasboard.group({
      valor: ['', Validators.compose([Validators.required])],
      categoria: ['', Validators.compose([Validators.required])],
      descricao: ['', Validators.compose([Validators.required])],
      fixa: ['', Validators.compose([Validators.required])],
      conta: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      dataVencimento: ['', Validators.compose([Validators.required])],
    });
  }
  criarConta() {
    var user = firebase.default.auth().currentUser;
    // console.log(user)
    if (user?.uid) {
      const conta: Conta = {
        nome: this.formadicionarConta.get('nome')?.value,
        uid: user?.uid,
        banco: this.formadicionarConta.get('banco')?.value,
        saldo: this.formadicionarConta.get('saldo')?.value,
        tipo: this.formadicionarConta.get('tipo')?.value,
        descricao: this.formadicionarConta.get('descricao')?.value,
      }
      console.log(conta);
      return this.serviceDb.AddContas(conta, 'conta');

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
    });

  }
  filterUser(uid: any) {
    let retorno;
    for (let index = 0; index < uid.length; index++) {
      if (uid[index].payload.doc?.data().uid === this.uidUserLS.uid) {

        this.users = uid[index].payload.doc?.data();
        console.log(uid[index].payload.doc.id);
        // console.log(this.users);
      }

    }
    return this.users;
  }
  contaInfo() {
    this.authService.getContaBancos().subscribe(res => {
      this.contasBanco = res;
      console.log(this.contasBanco);
      this.filterContas(this.contasBanco);
      // console.log(this.contasBanco.payload?.doc.data());
    })
  }
  filterContas(contas: any) {
    let contasX;
    for (let index = 0; index < contas.length; index++) {
      if (contas[index].payload.doc?.data().uid === this.uidUserLS.uid) {
        // console.log(uid[index].payload.doc?.data());
        if (!listaContasBanco.includes(contas[index].payload.doc?.data())) {
          console.log(contas[index].payload.doc?.id);
          listaContasBanco.push(contas[index].payload.doc?.data());

        }
        if (!this.listaCB.includes(contas[index].payload.doc?.data())) {
          this.listaCB.push(contas[index].payload.doc?.data());
        }
      }

    }
    console.log(listaContasBanco);
    return listaContasBanco;
  }

  criarDespesa() {
    var user = firebase.default.auth().currentUser;
    let contaRef = firebase.default.firestore().collection("conta").doc(this.idConta);
    // this.userRef = firebase.default.firestore().collection("users").doc(user?.uid);
    this.buscarConta(this.contasBanco, this.formadicionarDespesa.get('conta')?.value);
    console.log(this.idConta);
    console.log(this.contaRel);

    console.log(user)
    if (user?.uid) {
      const despesa: Despesa = {
        dataVencimento: this.formadicionarDespesa.get('dataVencimento')?.value,
        valor: this.formadicionarDespesa.get('valor')?.value,
        uid: user.uid,
        descricao: this.formadicionarDespesa.get('descricao')?.value,
        fixa: this.formadicionarDespesa.get('fixa')?.value,
        status: this.formadicionarDespesa.get('status')?.value,
        conta: this.idConta,
        categoria: this.formadicionarDespesa.get('categoria')?.value,
      }
      this.serviceDb.AddDespesas(despesa, 'despesas').subscribe(
        value => {
          this.dep.ngOnInit();
          console.log("sucess")
        },

        err => console.log('error')
      );
      return 'success';
    } else {
      alert("usuario n logado");
      return false;
    }

  }


  buscarConta(list: any, nomeConta: any) {
    let buscarIdConta;
    let idx;
    for (let index = 0; index < list.length; index++) {
      if (list[index].payload.doc?.data().uid === this.uidUserLS.uid && list[index].payload.doc?.data().nome === nomeConta) {
        // console.log(uid[index].payload.doc?.data());
        this.contaRel = list[index].payload.doc.data();
        this.idConta = list[index].payload.doc.id;
      }

    }
    console.log('aqui - ' + this.idConta);
    return this.idConta;
  }

  buscarDespesas() {
    let despesa;
    // this.serviceDb.GetDespesas();
    // this.serviceDb.GetDespesas().subscribe({
    //   next(x) {
    //     console.log(x)
    //     despesa = x;
    //     listaDespesas = x;
    //     console.log(despesa);
    //   },
    //   error(err) {
    //     console.log(err)
    //     // desp = err;
    //   },
    // });
    console.log(listaDespesas);

  }
  filterDespesas(despesa: any) {
    let contasX;

    for (let index = 0; index < despesa?.length; index++) {
      // if (despesa ? [index].uid === this.uidUserLS.uid) {
      // console.log(uid[index].payload.doc?.data());
      listaDespesas.push(despesa[index]);
      this.lsDespesa.push(despesa[index]);
      // }

    }


    console.log(listaDespesas);
    return listaDespesas;
  }


  showContas() {
    this.exibirDespesas = false;
    this.exibirContas = true;
  }
  showDespesas() {
    this.exibirContas = false;
    this.exibirDespesas = true;
  }
  showDashboard() {
    this.exibirDespesas = false;
    this.exibirContas = false;
  }
  showRecursos() {
    this.exibirContas = false;
    this.exibirDespesas = false;
  }
}
