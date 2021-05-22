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
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ReceitaComponent,
    CompetenciaListComponent,
    NaveBarComponent,
    DespesaComponent,
    Erro404Component,
    CadastroDespesaComponent,
    CadastroReceitaComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReceitaModule,
    DespesaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
