import { CompetenciaService } from './../competencia/competencia.service';
import { Competencia } from './../competencia/competencia';
import { AutorizacaoApiResponse } from './../autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from './../autorizacao-api/autorizacao-api.service';
import { ReceitaService } from './receita.service';
import { Component, OnInit } from '@angular/core';
import {Receita} from './receita';

@Component({
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {

    filterReceitas:Receita[] =[];
    _identificadorCompetencia: string = "";
    _autenticaoResponseApi: AutorizacaoApiResponse = new AutorizacaoApiResponse();
    _receitas : Receita[] =[];
    _filterBy: string = "";
    competencias : Competencia[] = [];
    compe : Competencia = new Competencia();


  constructor(private receitaService : ReceitaService,private competenciaService: CompetenciaService,private autorizcaoApiService : AutorizacaoApiService) { }

  ngOnInit(): void {
    this.getCompetencia();
  }

getCompetencia(): void{
  this.autorizcaoApiService.AutorizacaoApi().subscribe({
    next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
      this._autenticaoResponseApi =autorizcaoApiResponse;
      if(autorizcaoApiResponse.message=="OK"){
      console.log(autorizcaoApiResponse.accessToken);
      this.competenciaService.GetCompetencia(autorizcaoApiResponse.accessToken).subscribe({
            next: (competencias: Competencia[]) => {
              this.competencias = competencias;
              console.log(this.competencias);
              this.getReceitas(autorizcaoApiResponse);
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
    getReceitas(autorizcaoApiResponse: AutorizacaoApiResponse ) : void{
        if(autorizcaoApiResponse.message=="OK"){
          this.receitaService.GetReceitas(autorizcaoApiResponse.accessToken).subscribe({
            next: (receitas: Receita[]) => {
                this._receitas = receitas;
                this.filterReceitas =this._receitas; //this._receitas.filter((receita: Receita) => receita.competenciaId.toLocaleLowerCase().indexOf(this._identificadorCompetencia.toLocaleLowerCase())>-1);
            },
            error: err=>console.log("ERRO: ",err)
          });
          }else{
            console.log("ERRO: ",autorizcaoApiResponse.message);
          }
      }



  set filter(value:string){
    this._filterBy = value;
    this.filterReceitas = this._receitas.filter((receita: Receita) => receita.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase())>-1);
  }

  get filter():string{
    return this._filterBy;
  }

  set identificadorCompetencia(value:string){
    this._identificadorCompetencia = value;
    if(value=="")
    { if(this._autenticaoResponseApi.message=="OK"){
        this.getReceitas(this._autenticaoResponseApi);}else{
          this.autorizcaoApiService.AutorizacaoApi().subscribe({
            next: (autorizacaoApi: AutorizacaoApiResponse) => {
              this._autenticaoResponseApi = autorizacaoApi;
              this.getReceitas(autorizacaoApi);
            }
          });
        }
    }
    else
    {
      if(this._autenticaoResponseApi.message=="OK"){
        this.receitaService.GetReceitasByCompetenciaId(this._autenticaoResponseApi.accessToken,value).subscribe({
          next: (receitas: Receita[]) => {
              this._receitas = receitas;
              this.filterReceitas =this._receitas;
          },
          error: err=>console.log("ERRO: ",err)
        });
        }else{
          this.autorizcaoApiService.AutorizacaoApi().subscribe({
            next: (autorizcaoApiResponse: AutorizacaoApiResponse) =>{
              this._autenticaoResponseApi =autorizcaoApiResponse;
              if(autorizcaoApiResponse.message=="OK"){
                this.receitaService.GetReceitasByCompetenciaId(this._autenticaoResponseApi.accessToken,value).subscribe({
                  next: (receitas: Receita[]) => {
                      this._receitas = receitas;
                      this.filterReceitas =this._receitas;
                  },
                  error: err=>console.log("ERRO: ",err)
                });
              }else{
                this._receitas =  [];
              }
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
    }
}
  get identificadorCompetencia(){
    return this._identificadorCompetencia ;
  }
}
