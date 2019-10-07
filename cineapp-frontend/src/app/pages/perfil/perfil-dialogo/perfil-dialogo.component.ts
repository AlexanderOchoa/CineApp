import {Genero} from './../../../_model/genero';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Rol} from '../../../_model/rol';
import {UsuarioService} from '../../../_service/usuario.service';
import {DomSanitizer} from '@angular/platform-browser';
import {RolService} from '../../../_service/rol.service';
import {Usuario} from '../../../_model/usuario';

@Component({
  selector: 'app-perfil-dialogo',
  templateUrl: './perfil-dialogo.component.html',
  styleUrls: ['./perfil-dialogo.component.css']
})
export class PerfilDialogoComponent implements OnInit {

  imagenData: any;
  imagenEstado: boolean = false;

  esEditar: boolean = false;

  selectedFiles: FileList;
  labelFile: string;
  currentFileUpload: File;

  usuario: Usuario;

  constructor(private dialogRef: MatDialogRef<PerfilDialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Genero,
              private rolService: RolService,
              private usuarioService: UsuarioService,
              private sanitization: DomSanitizer,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
    const decodedToken = helper.decodeToken(tk.access_token);
    this.usuario = new Usuario();
    this.usuario.username = decodedToken.user_name;

    this.rolService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
      this.usuario.roles = data;
    });

    this.usuarioService.obtenerFoto(decodedToken.user_name).subscribe(data => {
      if (data.size > 0) {
        this.convertir(data);
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.imagenData = base64;
      this.setear(base64);
    };
  }

  setear(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  ngEditar() {
    this.esEditar = true;
  }

  ngGuardarCambios() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }

    this.usuarioService.modificar(this.usuario, this.currentFileUpload).subscribe(data => {
      this.dialogRef.close();
      this.snackBar.open('La actualización fue exitosa.', '', { duration: 5000 });
    });
  }

}
