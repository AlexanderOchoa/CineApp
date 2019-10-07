import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Cliente} from '../../../_model/cliente';
import {ClienteService} from '../../../_service/cliente.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-cliente-dialogo',
  templateUrl: './cliente-dialogo.component.html',
  styleUrls: ['./cliente-dialogo.component.css']
})
export class ClienteDialogoComponent implements OnInit {

  cliente: Cliente;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  esRegistro: boolean = true;

  constructor(private dialogRef: MatDialogRef<ClienteDialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Cliente,
              private clienteService: ClienteService,
              private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.cliente = new Cliente();

    if (this.data.idCliente != null) {
      this.esRegistro = false;
      this.cliente.idCliente = this.data.idCliente;
      this.cliente.nombres = this.data.nombres;
      this.cliente.apellidos = this.data.apellidos;
      this.cliente.dni = this.data.dni;
      this.cliente.fechaNac = this.data.fechaNac;

      this.clienteService.obtenerFoto(this.data.idCliente).subscribe(data => {
        if (data.size > 0) {
          this.convertir(data);
        }
      });
    }
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

  cancelar() {
    this.dialogRef.close();
  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  ngGuardarCambios() {
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }

    if (this.esRegistro) {
      this.clienteService.registrar(this.cliente, this.currentFileUpload).pipe(switchMap(() => {
        return this.clienteService.listar();
      })).subscribe(data => {
        this.clienteService.clienteCambio.next(data);
        this.clienteService.mensajeCambio.next('El registro fue exitoso.');
      });
    } else {
      this.clienteService.modificar(this.cliente, this.currentFileUpload).pipe(switchMap(() => {
        return this.clienteService.listar();
      })).subscribe(data => {
        this.clienteService.clienteCambio.next(data);
        this.clienteService.mensajeCambio.next('La modificación fue exitosa.');
      });
    }

    this.dialogRef.close();
  }

}
