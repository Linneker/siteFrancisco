import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroReceitaComponent } from './cadastro-receita/cadastro-receita.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [

    CadastroReceitaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'receita/cadastro-receita', component: CadastroReceitaComponent
      }
    ])
  ],
  exports: [CadastroReceitaComponent]
})
export class ReceitaModule { }
