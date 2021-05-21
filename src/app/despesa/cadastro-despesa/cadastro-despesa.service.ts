import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DespesaRequest } from 'src/app/despesa/cadastro-despesa/despesa-request';
import { ResponseApi } from 'src/app/response/response-api';

@Injectable({
  providedIn: 'root'
})
export class CadastroDespesaService {


  despesaUrl: string ="https://bardochiquinho.acmesistemas.com.br/api/Despesa/Add";
  constructor(private httpClient: HttpClient) { }

  AddDespesa(despesa: DespesaRequest,token: string): Observable<ResponseApi>
  {
    return this.httpClient.post<ResponseApi>(this.despesaUrl,despesa,{
      headers: new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer '+token)
    });
  }}
