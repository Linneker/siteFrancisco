import { Component, OnInit } from '@angular/core';
import { AutorizacaoApiResponse } from 'src/app/autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from 'src/app/autorizacao-api/autorizacao-api.service';
import { Competencia } from 'src/app/competencia/competencia';
import { CompetenciaService } from 'src/app/competencia/competencia.service';
import { ResponseApi } from 'src/app/response/response-api';
import { Despesa } from '../despesa';
import { CadastroDespesaService } from './cadastro-despesa.service';
import { DespesaRequest } from './despesa-request';

@Component({
  selector: 'app-cadastro-despesa',
  templateUrl: './cadastro-despesa.component.html',
  styleUrls: ['./cadastro-despesa.component.css']
})
export class CadastroDespesaComponent implements OnInit {


  competencias : Competencia[] = [];
  despesaRequest: DespesaRequest = new DespesaRequest();
  constructor(private cadDespesaService : CadastroDespesaService,private competenciaService: CompetenciaService,private autorizcaoApiService : AutorizacaoApiService) { }

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

    console.log(JSON.stringify(this.despesaRequest));
    const isFixa : boolean = (this.despesaRequest.despesaFixa==="1" ? true : false)
    const aux = {
      descricao : this.despesaRequest.descricao,
      nome : this.despesaRequest.nome,
      competenciaId: this.despesaRequest.competenciaId,
      valor: this.despesaRequest.valor,
      despesaFixa :isFixa
    };

    debugger;
    console.log(JSON.stringify(this.despesaRequest));

    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next: (autorizacaoApiResponse: AutorizacaoApiResponse) =>{
        if(autorizacaoApiResponse.authenticated){
          this.cadDespesaService.AddDespesa(aux, autorizacaoApiResponse.accessToken).subscribe({
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
