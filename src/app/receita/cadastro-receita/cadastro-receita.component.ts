import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { CompetenciaService } from './../../competencia/competencia.service';
import { AutorizacaoApiResponse } from './../../autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from './../../autorizacao-api/autorizacao-api.service';
import { ResponseApi } from './../../response/response-api';
import { CadastroReceitaService } from './cadastro-receita.service';
import { ReceitaRequest } from './receita-request';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { Competencia } from 'src/app/competencia/competencia';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './cadastro-receita.component.html',
  styleUrls: ['./cadastro-receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {

  competencias : Competencia[] = [];
  receitaRequest: ReceitaRequest = new ReceitaRequest();
  bsModalRef: BsModalRef = new BsModalRef();

  constructor(private cadReceitaService : CadastroReceitaService,
    private competenciaService: CompetenciaService,
    private autorizcaoApiService : AutorizacaoApiService,
    private modalService: BsModalService
    ) { }

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
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next: (autorizacaoApiResponse: AutorizacaoApiResponse) =>{
        if(autorizacaoApiResponse.authenticated){
          const isFixa : boolean = (this.receitaRequest.receitaFixa==="1" ? true : false)
          const aux = {
            descricao : this.receitaRequest.descricao,
            nome : this.receitaRequest.nome,
            competenciaId: this.receitaRequest.competenciaId,
            valor: this.receitaRequest.valor,
            receitaFixa :isFixa
          };
          const elemento =
          this.cadReceitaService.AddReceita(aux, autorizacaoApiResponse.accessToken).subscribe({
              next: (competencias: ResponseApi) => {
                console.log(competencias);
                if(competencias.responseHttp==200){
                    this.mensagemCad("Receita Cadastrada Com Sucesso!","success","/receita");
                }else{
                  this.mensagemCad("Receita Não Cadastrada!","danger","receita/cadastro-receita");
                }

              },
              error:err=>this.mensagemCad("Receita Não Cadastrada!","danger","receita/cadastro-receita")
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
