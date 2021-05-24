import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AutorizacaoApiResponse } from '../autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from '../autorizacao-api/autorizacao-api.service';
import { Competencia } from '../competencia/competencia';
import { CompetenciaService } from '../competencia/competencia.service';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';

@Component({
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {

  filterDespesas:Despesa[] =[];
  _identificadorCompetencia: string = "";
  _autenticaoResponseApi: AutorizacaoApiResponse = new AutorizacaoApiResponse();
  _despesas : Despesa[] =[];
  _filterBy: string = "";
  competencias : Competencia[] = [];
  compe : Competencia = new Competencia();


constructor(private DespesaService : DespesaService,private competenciaService: CompetenciaService,private autorizcaoApiService : AutorizacaoApiService) { }

ngOnInit(): void {
  this.getCompetencia();
}

  getCompetencia(): void
  {
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
        this._autenticaoResponseApi =autorizcaoApiResponse;
        if(autorizcaoApiResponse.message=="OK"){
          this.competenciaService.GetCompetencia(autorizcaoApiResponse.accessToken).subscribe({
            next: (competencias: Competencia[]) => {
              this.competencias = competencias;
              console.log(this.competencias);
              this.getDespesas(autorizcaoApiResponse);
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
        else
        {
          console.log("ERRO: ",autorizcaoApiResponse.message);
        }
      },
      error: err=>console.log("ERRO: ",err)
    });
  }

  getDespesas(autorizcaoApiResponse: AutorizacaoApiResponse ) : void
  {
    if(autorizcaoApiResponse.message=="OK"){
      this.DespesaService.GetDespesas(autorizcaoApiResponse.accessToken).subscribe({
        next: (despesas: Despesa[]) => {
            this._despesas = despesas;
            this.filterDespesas =this._despesas; //this._Despesas.filter((Despesa: Despesa) => Despesa.competenciaId.toLocaleLowerCase().indexOf(this._identificadorCompetencia.toLocaleLowerCase())>-1);
        },
        error: err=>console.log("ERRO: ",err)
      });
      }else{
        console.log("ERRO: ",autorizcaoApiResponse.message);
      }
  }

  set filter(value:string){
    this._filterBy = value;
    this.filterDespesas = this._despesas.filter((Despesa: Despesa) => Despesa.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase())>-1);
  }

  get filter():string{
    return this._filterBy;
  }

  set identificadorCompetencia(value:string){
    this._identificadorCompetencia = value;
    if(value=="")
    {
      if(this._autenticaoResponseApi.message=="OK"){
        this.getDespesas(this._autenticaoResponseApi);
      }
      else
      {
        this.autorizcaoApiService.AutorizacaoApi().subscribe({
          next: (autorizacaoApi: AutorizacaoApiResponse) => {
            this._autenticaoResponseApi = autorizacaoApi;
            this.getDespesas(autorizacaoApi);
          }
        });
      }
    }
    else
    {
      if(this._autenticaoResponseApi.message=="OK"){
        this.DespesaService.GetDespesasByCompetenciaId(this._autenticaoResponseApi.accessToken,value).subscribe({
          next: (Despesas: Despesa[]) => {
            this._despesas = Despesas;
            this.filterDespesas =this._despesas;
          },
          error: err=>console.log("ERRO: ",err)
        });
      }
      else
      {
        this.autorizcaoApiService.AutorizacaoApi().subscribe({
          next: (autorizcaoApiResponse: AutorizacaoApiResponse) =>{
            this._autenticaoResponseApi =autorizcaoApiResponse;
            if(autorizcaoApiResponse.message=="OK")
            {
              this.DespesaService.GetDespesasByCompetenciaId(this._autenticaoResponseApi.accessToken,value).subscribe({
                next: (Despesas: Despesa[]) =>
                {
                  this._despesas = Despesas;
                  this.filterDespesas =this._despesas;
                },
                error: err=>console.log("ERRO: ",err)
              });
            }
            else
            {
              this._despesas =  [];
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

  getDespesasMaisEpressivosDoMes(): void
  {
    const now = new Date();
    const mes : number= (now.getMonth()+1);
    const ano : number= now.getFullYear();

    debugger;
    if(this._autenticaoResponseApi.message=="OK")
    {
      this.DespesaService.GetDespesaByCompetenciaAnoAndCompetenciaMesOrderByMaiorValor(
        this._autenticaoResponseApi.accessToken,ano,mes).subscribe({
          next: (receitas: Despesa[]) => {
            this._despesas = receitas;
            this.filterDespesas =this._despesas;
          },
          error: err=>console.log("ERRO: ",err)
        });
    }
    else
    {
      this.autorizcaoApiService.AutorizacaoApi().subscribe({
        next: (autorizcaoApiResponse: AutorizacaoApiResponse) =>{
          this._autenticaoResponseApi =autorizcaoApiResponse;
          if(autorizcaoApiResponse.message=="OK"){
            this.DespesaService.GetDespesaByCompetenciaAnoAndCompetenciaMesOrderByMaiorValor(
            this._autenticaoResponseApi.accessToken,ano,mes).subscribe({
              next: (receitas: Despesa[]) => {
                this._despesas = receitas;
                this.filterDespesas =this._despesas;
              },
              error:err=>console.log(err)
            });
          }
          else
          {
            this._despesas =  [];
          }
        },
        error: err=>console.log("ERRO: ",err)
      });
    }
  }
}
