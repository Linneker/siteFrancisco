import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';
import { AutorizacaoApiService } from '../autorizacao-api/autorizacao-api.service';
import { AutorizacaoApiResponse } from '../autorizacao-api/autorizacao-api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : Usuario = new Usuario();
  constructor(private usuarioService : UsuarioService,private autorizcaoApiService : AutorizacaoApiService,private router: Router) { }
  mostrarMenu: boolean = false;

  ngOnInit(): void {
  }

  Login():void
  {
    debugger;
    console.log(this.login);
    this.autorizcaoApiService.AutorizacaoApi().subscribe({
      next:(autorizcaoApiResponse: AutorizacaoApiResponse) =>
        this.usuarioService.Login(autorizcaoApiResponse.accessToken,this.login.Login,this.login.Senha)
    });
  }

}
