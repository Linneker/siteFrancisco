import { AutorizacaoApiService } from './../autorizacao-api/autorizacao-api.service';
import { CompetenciaService } from './competencia.service';
import { Competencia } from './competencia';
import { Component, OnInit } from '@angular/core';
import { AutorizacaoApiResponse } from '../autorizacao-api/autorizacao-api-response';

@Component({
  templateUrl: './competencia-list.component.html'
})
export class CompetenciaListComponent implements OnInit
{
    _identificadorCompetencia:string = "";
    competencias : Competencia[] = [];
    compe : Competencia = new Competencia();

    constructor(private competenciaService: CompetenciaService, private autorizcaoApiService : AutorizacaoApiService){

    }
    onAddCompetencia(){
    }
    getCompetenciaByAnoAndMes(ano: number, mes: number){
      this.autorizcaoApiService.AutorizacaoApi().subscribe({
        next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
        if(autorizcaoApiResponse.message=="OK"){
          this.competenciaService.GetCompetenciaByAnoAndMes(ano,mes,autorizcaoApiResponse.accessToken).subscribe({
                next: (competencia: Competencia) => {
                  this.compe = competencia;
                  console.log(this.compe);

                },
                error: err=>console.log("ERRO: ",err)
              });
            }else{
              console.log("ERRO: ",autorizcaoApiResponse.message);
            }
          },
        error: err=>console.log("ERRO: ",err)
      });
    }

    retrieveAll():void{
      this.autorizcaoApiService.AutorizacaoApi().subscribe({
        next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
        if(autorizcaoApiResponse.message=="OK"){
          console.log(autorizcaoApiResponse.accessToken);
          this.competenciaService.GetCompetencia(autorizcaoApiResponse.accessToken).subscribe({
                next: (competencias: Competencia[]) => {
                  this.competencias = competencias;
                  console.log(this.competencias);

                },
                error: err=>console.log("ERRO: ",err)
              });
            }else{
              console.log("ERRO: ",autorizcaoApiResponse.message);
            }
          },
        error: err=>console.log("ERRO: ",err)
      });
    }

    set identificadorCompetencia(value:string){
      this._identificadorCompetencia = value;
    }
    get identificadorCompetencia(){
      return this._identificadorCompetencia ;
    }

    ngOnInit():void{
      this.retrieveAll();// = this.competenciaService.GetCompetencias();
    }
}
