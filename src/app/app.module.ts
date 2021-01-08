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
import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from "./guards/auth.guards";
import { HttpUtilService } from "./services/http-util-service";
import { LoginService } from "./services/login-service";

const appRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feedback', component: ModalFeedbacksComponent },
];
export const firebaseConfig = {
  apiKey: "AIzaSyCIoX09vPsJQABGmDRA3GnVekMjcZymuB8",
  authDomain: "easyfinancas-d1cb0.firebaseapp.com",
  projectId: "easyfinancas-d1cb0",
  storageBucket: "easyfinancas-d1cb0.appspot.com",
  messagingSenderId: "161335320210",
  appId: "1:161335320210:web:aa31a25b4ebae71394504b",
  measurementId: "G-S3E45JN2VP"
};
@NgModule({
  declarations: [AppComponent, LoginComponent, CadastroComponent, DashboardComponent, BoardComponent, InicioComponent, ModalFeedbacksComponent],
  providers: [AuthGuard, HttpUtilService, LoginService, AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, HttpClientModule, AngularFireModule.initializeApp(firebaseConfig)]
})
export class AppModule {

}
