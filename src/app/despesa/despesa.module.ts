import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CadastroDespesaComponent } from './cadastro-despesa/cadastro-despesa.component';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'despesa/cadastro-despesa', component: CadastroDespesaComponent
      }
    ])

  ]
})
export class DespesaModule { }
