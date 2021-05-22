import { CompetenciaService } from './../../competencia/competencia.service';
import { AutorizacaoApiResponse } from './../../autorizacao-api/autorizacao-api-response';
import { AutorizacaoApiService } from './../../autorizacao-api/autorizacao-api.service';
import { ResponseApi } from './../../response/response-api';
import { CadastroReceitaService } from './cadastro-receita.service';
import { ReceitaRequest } from './receita-request';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { Competencia } from 'src/app/competencia/competencia';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModelRetornoComponent } from '../../model-retorno/model-retorno.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './cadastro-receita.component.html',
  styleUrls: ['./cadastro-receita.component.css']
})
export class CadastroReceitaComponent implements OnInit {

  competencias : Competencia[] = [];
  receitaRequest: ReceitaRequest = new ReceitaRequest();
  _redirect: string = "";
  constructor(private cadReceitaService : CadastroReceitaService,
    private competenciaService: CompetenciaService,
    private autorizcaoApiService : AutorizacaoApiService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CadastroReceitaComponent>,
    private  router: Router) { }

  ngOnInit(): void {
    this._redirect = "receita";
    this.mensagem("Cadastrado Com sucesso");
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
          this.cadReceitaService.AddReceita(this.receitaRequest, autorizacaoApiResponse.accessToken).subscribe({
              next: (competencias: ResponseApi) => {
                console.log(competencias);
                if(competencias.responseHttp==200){
                  this._redirect = "receita";
                  this.mensagem(competencias.mensagem);
                }

              },
              error:err=>console.log(err)
          });
        }
        else{
          console.log("ERRO: ",autorizacaoApiResponse.message);
        }
      },
      error:err=>console.log("erro: ",err)
    });
  }
  goTo(): void{

  }
  mensagem(mensagem: string): void {

    const dialogRef = this.dialog.open(CadastroReceitaComponent, {
      width: '250px',

    });
    dialogRef.afterOpened().subscribe(result => {
      console.log(mensagem);
      this.router.navigate([`/${this._redirect}`, '']);

      //this.mdComponent.setMensagem = mensagem;

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.mdComponent.setRedirect = this._redirect;
    });
  }
}
