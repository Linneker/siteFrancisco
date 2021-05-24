import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from 'src/app/despesa/despesa';
import { Receita } from 'src/app/receita/receita';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private receitaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Receita";
  private despesaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Despesa";

  constructor(private httpClient: HttpClient) { }

  GetReceitaTotalMes(token: string): Observable<number>
  {
    return this.httpClient.get<number>(`${this.receitaUrl}/GetReceitaTotalMes`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }

  GetReceitaTotalAnual(token: string): Observable<number>
  {
    return this.httpClient.get<number>(`${this.receitaUrl}/GetReceitaTotalAnual`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }

  GetDespesaTotalMes(token: string): Observable<number>
  {
    return this.httpClient.get<number>(`${this.despesaUrl}/GetDespesaTotalMes`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }

  GetDespesaTotalAnual(token: string): Observable<number>
  {
    return this.httpClient.get<number>(`${this.despesaUrl}/GetDespesaTotalAnual`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }
}
