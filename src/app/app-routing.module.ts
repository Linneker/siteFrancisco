import { DespesaComponent } from './despesa/despesa.component';
import { ReceitaComponent } from './receita/receita.component';
import { CompetenciaListComponent } from './competencia/competencia-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erro404Component } from './erro-404/erro-404.component';
import { CadastroReceitaComponent } from './receita/cadastro-receita/cadastro-receita.component';
import { CadastroDespesaComponent } from './despesa/cadastro-despesa/cadastro-despesa.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'receita', pathMatch: 'full'
  },
  {
    path: 'competencia', component: CompetenciaListComponent
  },
  {
    path: 'receita', component: ReceitaComponent
  },
  {
    path: 'despesa/cadastro-despesa', component: CadastroDespesaComponent
  },
  {
    path: 'receita/cadastro-receita', component: CadastroReceitaComponent
  },
  {
    path: 'despesa', component: DespesaComponent
  },
  {
    path: '**', component: Erro404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
