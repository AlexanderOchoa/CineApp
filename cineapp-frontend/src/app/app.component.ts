import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';
import { Component } from '@angular/core';
import { MenuService } from './_service/menu.service';
import {Genero} from './_model/genero';
import {GeneroDialogoComponent} from './pages/genero/genero-dialogo/genero-dialogo.component';
import {MatDialog} from '@angular/material';
import {PerfilDialogoComponent} from './pages/perfil/perfil-dialogo/perfil-dialogo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menus: Menu[];

  constructor(public loginService: LoginService,
              private menuService: MenuService,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.menuService.menuCambio.subscribe(data => {
      this.menus = data;
    });
  }

  ngMostrarPerfil() {
    this.dialog.open(PerfilDialogoComponent, {
      width: '400px'
    });
  }

}
