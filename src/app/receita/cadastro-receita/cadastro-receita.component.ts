import { CompetenciaService } from './../../competencia/competencia.service';
import { AutorizacaoApiResponse } from './../../autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from './../../autorizacao-api/autorizacao-api.service';
import { ResponseApi } from './../../response/response-api';
import { CadastroReceitaService } from './cadastro-receita.service';
import { ReceitaRequest } from './receita-request';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { Competencia } from 'src/app/competencia/competencia';

@Component({
  templateUrl: './cadastro-receita.component.html',
  styleUrls: ['./cadastro-receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {

  competencias : Competencia[] = [];
  receitaRequest: ReceitaRequest = new ReceitaRequest();
  constructor(private cadReceitaService : CadastroReceitaService,private competenciaService: CompetenciaService,private autorizcaoApiService : AutorizacaoApiService) { }

  ngOnInit(): void {
     this.getCompetencia();
  }

  getCompetencia(): void{
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
      if(autorizcaoApiResponse.message=="OK"){
        console.log(autorizcaoApiResponse.accessToken);
        this.competenciaService.GetCompetencia(autorizcaoApiResponse.accessToken).subscribe({
              next: (competencias: Competencia[]) =>this.competencias = competencias,
              error: err=>console.log("ERRO: ",err)
            });
          }else{
            console.log("ERRO: ",autorizcaoApiResponse.message);
          }
        },
      error: err=>console.log("ERRO: ",err)
    });
  }

  addCadastro() : void{
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next: (autorizacaoApiResponse: AutorizacaoApiResponse) =>{
        if(autorizacaoApiResponse.authenticated){
          this.cadReceitaService.AddReceita(this.receitaRequest, autorizacaoApiResponse.accessToken).subscribe({
              next: (competencias: ResponseApi) => {
                console.log(competencias);
              },
              error:err=>console.log(err)
          });
        }
        else{
          console.log("ERRO: ",autorizacaoApiResponse.message);
        }
      },
      error:err=>console.log("erro: ",err)
    });
  }
}
