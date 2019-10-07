import { GeneroService } from './../../../_service/genero.service';
import { Genero } from './../../../_model/genero';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-genero-dialogo',
  templateUrl: './genero-dialogo.component.html',
  styleUrls: ['./genero-dialogo.component.css']
})
export class GeneroDialogoComponent implements OnInit {

  genero: Genero;

  constructor(private dialogRef: MatDialogRef<GeneroDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Genero, private generoService: GeneroService) { }

  ngOnInit() {
    this.genero = new Genero();
    this.genero.idGenero = this.data.idGenero;
    this.genero.nombre = this.data.nombre;
  }

  operar() {
    if (this.genero != null && this.genero.idGenero > 0) {
      this.generoService.modificar(this.genero).pipe(switchMap(() => {
        return this.generoService.listar();
      })).subscribe(data => {
        this.generoService.generoCambio.next(data);
        this.generoService.mensajeCambio.next("Se modifico");
      });
    } else {
      this.generoService.registrar(this.genero).subscribe(data => {
        this.generoService.listar().subscribe(generos => {
          this.generoService.generoCambio.next(generos);
          this.generoService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
