import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { ConfirmaEmailComponent } from './confirma-email/confirma-email.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Platform } from '@angular/cdk/platform';
import { SpinnerComponent } from './spinner/spinner.component';
import { animate } from '@angular/animations';
import { ContaComponent } from './conta/conta.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { DespesaComponent } from './despesa/despesa.component';
registerLocaleData(ptBr);


const appRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'feedback', component: ModalFeedbacksComponent },
  { path: 'recuperarSenha', component: RecuperarSenhaComponent },
  { path: 'confirmarEmail', component: ConfirmaEmailComponent },
  { path: 'spinner', component: SpinnerComponent },
];

@NgModule({
  declarations: [AppComponent, LoginComponent, CadastroComponent, DashboardComponent, BoardComponent, InicioComponent, ModalFeedbacksComponent, RecuperarSenhaComponent, ConfirmaEmailComponent, SpinnerComponent, ContaComponent, DespesaComponent],
  providers: [AuthService, ModalFeedbacksComponent,
    {
      provide: LOCALE_ID,
      useValue: "pt"
    }],
  bootstrap: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes, { paramsInheritanceStrategy: 'always' }), ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule,
    AngularFirestoreModule, MatProgressSpinnerModule],
})
export class AppModule { }
