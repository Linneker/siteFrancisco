import { AuthGuard } from './guard/auth-guard';
import { UsuarioService } from './usuario/usuario.service';
import { HomeComponent } from './home/home/home.component';
import { DespesaComponent } from './despesa/despesa.component';
import { ReceitaComponent } from './receita/receita.component';
import { CompetenciaListComponent } from './competencia/competencia-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erro404Component } from './erro-404/erro-404.component';
import { CadastroReceitaComponent } from './receita/cadastro-receita/cadastro-receita.component';
import { CadastroDespesaComponent } from './despesa/cadastro-despesa/cadastro-despesa.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'competencia', component: CompetenciaListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'receita', component: ReceitaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'despesa/cadastro-despesa', component: CadastroDespesaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'receita/cadastro-receita', component: CadastroReceitaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'despesa', component: DespesaComponent, canActivate: [AuthGuard]
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
