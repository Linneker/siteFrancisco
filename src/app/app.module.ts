import { AuthGuard } from './guard/auth-guard';
import { HomeComponent } from './home/home/home.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { DespesaModule } from './despesa/despesa.module';
import { NaveBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceitaComponent } from './receita/receita.component';
import { CompetenciaListComponent } from './competencia/competencia-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DespesaComponent } from './despesa/despesa.component';
import { Erro404Component } from './erro-404/erro-404.component';
import { FormsModule } from '@angular/forms';
import { ReceitaModule } from './receita/receita.module';
import { CadastroDespesaComponent } from './despesa/cadastro-despesa/cadastro-despesa.component';
import { CadastroReceitaComponent } from './receita/cadastro-receita/cadastro-receita.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeModule } from './home/home.module';
import { PipePipe } from './pipe.pipe';
import { UsuarioService } from './usuario/usuario.service';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceitaComponent,
    CompetenciaListComponent,
    NaveBarComponent,
    DespesaComponent,
    Erro404Component,
    CadastroDespesaComponent,
    PipePipe,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DespesaModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    HomeModule
  ],
  providers: [UsuarioService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
