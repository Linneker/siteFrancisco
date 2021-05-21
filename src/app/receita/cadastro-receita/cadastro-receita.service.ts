import { Receita } from './../receita';
import { ResponseApi } from './../../response/response-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaRequest } from './receita-request';

@Injectable({
  providedIn: 'root'
})
export class CadastroReceitaService {

  receitaUrl: string ="https://bardochiquinho.acmesistemas.com.br/api/Receita/Add";
  constructor(private httpClient: HttpClient) { }

  AddReceita(receita: ReceitaRequest,token: string): Observable<ResponseApi>
  {
    return this.httpClient.post<ResponseApi>(this.receitaUrl,receita,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }
}
