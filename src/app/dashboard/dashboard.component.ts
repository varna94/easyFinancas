import { RecursosComponent } from './../recursos/recursos.component';
import { DespesaComponent } from './../despesa/despesa.component';
import { ApiService } from './../../api.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from './../shared/services/user';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './../shared/guard/auth.guard';
import { Conta, Despesa, Recurso } from './../shared/services/dashboard';
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
  formAdicionarRecursos: FormGroup;
  users: User;
  usersFilter: any;
  uidUserLS: any;
  contasBanco: any;
  despesas: any;
  contaRel: Conta;
  public bancoConta: string[] = [];
  public listaCB: Conta[] = [];
  exibirContas: boolean;
  exibirDespesas: boolean;
  exibirCartoes: boolean;
  exibirRecursos: boolean;
  userRef: User;
  contaRef: Conta;

  constructor(public authService: AuthService, private formDasboard: FormBuilder, public afs: AngularFirestore, private router: Router, public serviceDb: ApiService, public dep: DespesaComponent, public cmpRecurso: RecursosComponent) {
    this.formadicionarConta = this.formDasboard.group({
      nome: [],
      saldo: [],
      descricao: [],
      banco: [],
      tipo: [],
    });
    this.formAdicionarRecursos = this.formDasboard.group({
      saldo: [],
      conta: [],
      descricao: [],
      recebido: [],
      tipo: [],
      receitaFixa: [],
      repetir: [],
      periodo: [],
      dataRecebimento: [],
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
  criarFormRecursos() {
    this.formAdicionarRecursos = this.formDasboard.group({
      saldo: ['', Validators.compose([Validators.required])],
      conta: ['', Validators.compose([Validators.required])],
      descricao: [''],
      recebido: [false, Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      receitaFixa: [false, Validators.compose([Validators.required])],
      repetir: [0],
      periodo: [''],
      dataRecebimento: [null, Validators.compose([Validators.required])],
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
      // return this.serviceDb.AddContas(conta, 'contas');
      this.serviceDb.AddContas(conta, 'contas').subscribe(
        value => {
          this.dep.ngOnInit();
          console.log("sucess")
        },
        err => console.log('error')
      );
      return 'success';
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
    const conta = this.serviceDb.GetContas().then(conta => {
      // this.despesas = data;
      for (let i = 0; i < conta.length; i++) {
        if (conta[i].uid === this.uidUserLS.uid) {
          this.bancoConta.push(conta[i]._id);
          this.listaCB.push(conta[i]);
          // this.serviceDb.push(conta[i]);
          console.log(this.bancoConta);
        }
      }
      return conta;
    });
  }

  showContas() {
    this.exibirContas = true;
    this.exibirDespesas = false;
    this.exibirCartoes = false;
    this.exibirRecursos = false;
  }
  showDespesas() {
    this.exibirDespesas = true;
    this.exibirContas = false;
    this.exibirCartoes = false;
    this.exibirRecursos = false;
  }
  showDashboard() {
    this.exibirDespesas = false;
    this.exibirContas = false;
    this.exibirCartoes = false;
    this.exibirRecursos = false;
  }
  showRecursos() {
    this.exibirRecursos = true;
    this.exibirContas = false;
    this.exibirDespesas = false;
    this.exibirCartoes = false;
  }
  showCC() {
    this.exibirCartoes = true;
    this.exibirContas = false;
    this.exibirDespesas = false;
    this.exibirRecursos = false;
  }
}
