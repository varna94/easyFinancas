import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ReactiveFormsModule } from "@angular/forms";
import { InicioComponent } from './inicio/inicio.component';
import { ModalFeedbacksComponent } from './modal-feedbacks/modal-feedbacks.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AuthService } from "./shared/services/auth.service";
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
const appRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feedback', component: ModalFeedbacksComponent },
  { path: 'recuperarSenha', component: RecuperarSenhaComponent },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, CadastroComponent, DashboardComponent, BoardComponent, InicioComponent, ModalFeedbacksComponent, RecuperarSenhaComponent],
  providers: [AuthService],
  bootstrap: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule,
    AngularFirestoreModule,],
})
export class AppModule { }
