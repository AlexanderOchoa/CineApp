import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ComidaService } from './../../../_service/comida.service';
import { Comida } from './../../../_model/comida';
import { Component, OnInit, Inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comida-dialogo',
  templateUrl: './comida-dialogo.component.html',
  styleUrls: ['./comida-dialogo.component.css']
})
export class ComidaDialogoComponent implements OnInit {

  comida: Comida;
  imagenData: any;
  imagenEstado: boolean = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;

  constructor(private dialogRef: MatDialogRef<ComidaDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Comida, private comidaService: ComidaService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.comida = new Comida();
    this.comida.idComida = this.data.idComida;
    this.comida.nombre = this.data.nombre;
    this.comida.precio = this.data.precio;

    if (this.data.idComida > 0) {
      this.comidaService.listarPorId(this.data.idComida).subscribe(data => {
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
    }
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

  operar() {

    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }

    if (this.comida != null && this.comida.idComida > 0) {
      this.comidaService.modificar(this.comida, this.currentFileUpload).pipe(switchMap(() => {
        return this.comidaService.listar();
      })).subscribe(data => {
        this.comidaService.comidaCambio.next(data);
        this.comidaService.mensajeCambio.next("Se modifico");
      });
    } else {
      this.comidaService.registrar(this.comida, this.currentFileUpload).subscribe(data => {
        this.comidaService.listar().subscribe(comidas => {
          this.comidaService.comidaCambio.next(comidas);
          this.comidaService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

}
