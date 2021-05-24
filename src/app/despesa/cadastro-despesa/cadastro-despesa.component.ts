import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AutorizacaoApiResponse } from 'src/app/autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from 'src/app/autorizacao-api/autorizacao-api.service';
import { Competencia } from 'src/app/competencia/competencia';
import { CompetenciaService } from 'src/app/competencia/competencia.service';
import { ResponseApi } from 'src/app/response/response-api';
import { Despesa } from '../despesa';
import { CadastroDespesaService } from './cadastro-despesa.service';
import { DespesaRequest } from './despesa-request';

@Component({
  templateUrl: './cadastro-despesa.component.html',
  styleUrls: ['./cadastro-despesa.component.css']
})
export class CadastroDespesaComponent implements OnInit {


  competencias : Competencia[] = [];
  despesaRequest: DespesaRequest = new DespesaRequest();
  bsModalRef: BsModalRef = new BsModalRef();

  constructor(private cadDespesaService : CadastroDespesaService,
    private competenciaService: CompetenciaService,
    private autorizcaoApiService : AutorizacaoApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
     this.getCompetencia();
  }

  getCompetencia(): void{
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) => {
      if(autorizcaoApiResponse.message=="OK"){
        console.log(autorizcaoApiResponse.accessToken);
        this.competenciaService.GetCompetencia(autorizcaoApiResponse.accessToken).subscribe({
              next: (competencias: Competencia[]) =>this.competencias = competencias,
              error: err=>console.log("ERRO: ",err)
            });
          }else{
            console.log("ERRO: ",autorizcaoApiResponse.message);
          }
        },
      error: err=>console.log("ERRO: ",err)
    });
  }



  addCadastro() : void{

    console.log(JSON.stringify(this.despesaRequest));
    const isFixa : boolean = (this.despesaRequest.despesaFixa==="1" ? true : false)
    const aux = {
      descricao : this.despesaRequest.descricao,
      nome : this.despesaRequest.nome,
      competenciaId: this.despesaRequest.competenciaId,
      valor: this.despesaRequest.valor,
      despesaFixa :isFixa
    };

    debugger;
    console.log(JSON.stringify(this.despesaRequest));

    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next: (autorizacaoApiResponse: AutorizacaoApiResponse) =>{
        if(autorizacaoApiResponse.authenticated){
          this.cadDespesaService.AddDespesa(aux, autorizacaoApiResponse.accessToken).subscribe({
              next: (cadastrado: ResponseApi) => {
              console.log(cadastrado);
              if(cadastrado.responseHttp==200){
                  this.mensagemCad("Gasto Cadastrado Com Sucesso!","success","/despesa");
              }else{
                this.mensagemCad("Gasto Não Cadastrado!","danger","despesa/cadastro-despesa");
              }

              },
              error:err => {
                this.mensagemCad("Gasto Não Cadastrado!","danger","despesa/cadastro-despesa");
                console.log(err);
              }
          });
        }
        else{
          console.log("ERRO: ",autorizacaoApiResponse.message);
        }
      },
      error:err=>console.log("erro: ",err)
    });
  }

  mensagemCad(mensagem:string, tipo:string,redirectTo:string){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.tipo= tipo;
    this.bsModalRef.content.mensagem= mensagem;
    this.bsModalRef.content.redirectTo = redirectTo;//'/receita';
  }

}
