import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, CadastroComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
