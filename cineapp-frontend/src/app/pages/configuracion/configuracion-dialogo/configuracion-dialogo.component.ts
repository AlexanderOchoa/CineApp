import { ConfigService } from './../../../_service/config.service';
import { Config } from './../../../_model/config';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-configuracion-dialogo',
  templateUrl: './configuracion-dialogo.component.html',
  styleUrls: ['./configuracion-dialogo.component.css']
})
export class ConfiguracionDialogoComponent implements OnInit {

  config: Config;

  constructor(private dialogRef: MatDialogRef<ConfiguracionDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: Config, private configService: ConfigService) { }

  ngOnInit() {
    this.config = new Config();    
    this.config.parametro = this.data.parametro;    
    this.config.valor = this.data.valor;
  }

  cancelar() {   
    this.dialogRef.close();
  }

  operar() {
    if (this.config != null && this.config.idConfig > 0) {
      this.configService.modificar(this.config).subscribe(data => {
        this.configService.listar().subscribe(medicos => {
          this.configService.configCambio.next(medicos);
          this.configService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.configService.registrar(this.config).subscribe(data => {
        this.configService.listar().subscribe(generos => {
          this.configService.configCambio.next(generos);
          this.configService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

}
