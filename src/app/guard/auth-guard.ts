import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private usuarioService: UsuarioService, private router : Router){

  }

  canActivate(
    route : ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean> | boolean{

    if(this.usuarioService.UsuarioEstaAutenticado){
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
