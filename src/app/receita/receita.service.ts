import { Receita } from './receita';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private receitaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Receita";

  constructor(private httpClient: HttpClient) {

  }

  GetReceitas(token: string): Observable<Receita[]>
  {
    return this.httpClient.get<Receita[]>(this.receitaUrl,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }

  GetReceitasByCompetenciaId(token: string, competenciaId : string): Observable<Receita[]>
  {
    return this.httpClient.get<Receita[]>(`${this.receitaUrl}/GetReceitaByCompetenciaId/${competenciaId}`,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }
}
