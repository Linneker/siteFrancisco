import { UsuarioService } from './../../usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { AutorizacaoApiResponse } from 'src/app/autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from 'src/app/autorizacao-api/autorizacao-api.service';
import { HomeService } from './home.service';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recitaTotalMensal : number = 0;
  receitaTotalAnual : number = 0;
  despesaTotalMensal: number = 0;
  despesaTotalAnual : number = 0;
  _autenticaoResponseApi: AutorizacaoApiResponse = new AutorizacaoApiResponse();
  mes : number = 0;
  ano : number = 0;
  constructor(private homeService: HomeService,private autorizcaoApiService : AutorizacaoApiService, private usuarioService: UsuarioService) { }


  ngOnInit()
  {
    const now = new Date();
    this.mes = now.getMonth()+1;
    this.ano = now.getFullYear();

    this.usuarioService.mostrarMenuEmitter.emit(true);
    this.GetReceitaTotalMes();
    this.GetDespesaTotalMes();
    this.GetReceitaTotalAnual();
    this.GetDespesaTotalAnual();
  }

  GetReceitaTotalMes():void
  {
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) =>
      {
        this._autenticaoResponseApi = autorizcaoApiResponse;
        console.log(autorizcaoApiResponse);
        if(autorizcaoApiResponse.authenticated)
        {
          this.homeService.GetReceitaTotalMes(this._autenticaoResponseApi.accessToken).subscribe(
          {
            next: (receitas: number) =>
            {
              this.recitaTotalMensal = receitas;
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
      }
    });
  }

  GetReceitaTotalAnual():void
  {
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) =>
      {
        this._autenticaoResponseApi = autorizcaoApiResponse;
        console.log(autorizcaoApiResponse);
        if(autorizcaoApiResponse.authenticated)
        {
          this.homeService.GetReceitaTotalAnual(this._autenticaoResponseApi.accessToken).subscribe(
          {
            next: (receitas: number) =>
            {
              this.receitaTotalAnual = receitas;
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
      }
    });
  }

  GetDespesaTotalMes():void
  {
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) =>
      {
        this._autenticaoResponseApi = autorizcaoApiResponse;
        console.log(autorizcaoApiResponse);
        if(autorizcaoApiResponse.authenticated)
        {
          this.homeService.GetDespesaTotalMes(this._autenticaoResponseApi.accessToken).subscribe(
          {
            next: (despesa: number) =>
            {
              this.despesaTotalMensal =despesa;
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
      }
    });
  }

  GetDespesaTotalAnual():void
  {
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) =>
      {
        this._autenticaoResponseApi = autorizcaoApiResponse;
        console.log(autorizcaoApiResponse);
        if(autorizcaoApiResponse.authenticated)
        {
          this.homeService.GetDespesaTotalAnual(this._autenticaoResponseApi.accessToken).subscribe(
          {
            next: (despesa: number) =>
            {
              this.despesaTotalAnual = despesa;
            },
            error: err=>console.log("ERRO: ",err)
          });
        }
      }
    });
  }
}
