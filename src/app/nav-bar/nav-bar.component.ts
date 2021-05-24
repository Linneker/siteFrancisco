import { LoginComponent } from './../login/login.component';
import { Component } from "@angular/core";
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html'
})
export class NaveBarComponent{

  mostrarMenu : boolean = true;
  constructor(public loginService : UsuarioService){

  }

  OnInit(){
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar=>this.mostrarMenu = mostrar
    )
  }


}
