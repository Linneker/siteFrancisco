import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/response/response-api';
import { Despesa } from '../despesa';

@Injectable({
  providedIn: 'root'
})
export class CadastroDespesaService {


  despesaUrl: string ="https://bardochiquinho.acmesistemas.com.br/api/Despesa/Add";
  constructor(private httpClient: HttpClient) { }

  AddDespesa(despesa: any,token: string): Observable<ResponseApi>
  {
    return this.httpClient.post<ResponseApi>(this.despesaUrl,despesa,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }}
