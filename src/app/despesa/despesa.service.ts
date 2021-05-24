import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from './despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private DespesaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Despesa";

  constructor(private httpClient: HttpClient) {

  }

  GetDespesas(token: string): Observable<Despesa[]>
  {
    return this.httpClient.get<Despesa[]>(this.DespesaUrl,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }

  GetDespesasByCompetenciaId(token: string, competenciaId : string): Observable<Despesa[]>
  {
    console.log(`${this.DespesaUrl}/GetDespesaByCompetenciaId/${competenciaId}`);
    debugger;
    return this.httpClient.get<Despesa[]>(`${this.DespesaUrl}/GetDespesaByCompetenciaId/${competenciaId}`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }
  GetDespesaByCompetenciaAnoAndCompetenciaMesOrderByMaiorValor(token: string, ano : number, mes : number): Observable<Despesa[]>
  {
    return this.httpClient.get<Despesa[]>(`${this.DespesaUrl}/GetDespesaByCompetenciaAnoAndCompetenciaMesOrderByMaiorValor/${ano}/${mes}`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }
}
