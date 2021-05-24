import { Competencia } from './competencia';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  private competenciaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Competencia";


  constructor(private httpClient: HttpClient) {

  }

  GetCompetencia(token: string): Observable<Competencia[]>
  {
    return this.httpClient.get<Competencia[]>(`${this.competenciaUrl}/GetCompetenciasOrderByDesc`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
     });
  }

  GetCompetenciaByAnoAndMes(ano: number, mes: number, token: string) : Observable<Competencia>{
    return this.httpClient.get<Competencia>(`${this.competenciaUrl}/GetComptenciaByAnoAndMes/${ano}/${mes}`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
     });
  }
}
