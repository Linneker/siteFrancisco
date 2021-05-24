import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private receitaUrl: string = "https://bardochiquinho.acmesistemas.com.br/api/Usuario";
  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarMenu : boolean = false;
  usuarioAutenticado: boolean = false;

  constructor(private httpClient: HttpClient, private router : Router) {

  }

  Login(token: string, login: string, senha: string): void
  {
    let usrs : Usuario = new Usuario();
    usrs.Login = login;
    usrs.Senha= senha;

     this.httpClient.post<Usuario>(`${this.receitaUrl}/Login`,usrs,{
      headers: new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer '+token)
    }).subscribe({
      next: (usuario: Usuario)=>{
        if(usuario != null){
          this.usuarioAutenticado = true;
          this.mostrarMenuEmitter.emit(true);
          this.router.navigate(['/home']);
        }
        else{
          this.mostrarMenuEmitter.emit(false);
        }
      }
    });
  }

  Add(token: string,nome: string, login: string, senha: string): Observable<Usuario>
  {
    let usrs : Usuario = new Usuario();
    usrs.Nome = nome;
    usrs.Login = login;
    usrs.Senha= senha;

    return this.httpClient.post<Usuario>(`${this.receitaUrl}/Add`,usrs,{
      headers: new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer '+token)
    });
  }

  get UsuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
