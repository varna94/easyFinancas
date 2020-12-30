import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { ReactiveFormsModule } from "@angular/forms";

const appRoutes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, CadastroComponent, DashboardComponent, BoardComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule],
})
export class AppModule { }
