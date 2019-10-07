import { Config } from './../../_model/config';
import { ConfigService } from './../../_service/config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { ConfiguracionDialogoComponent } from './configuracion-dialogo/configuracion-dialogo.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Config>;
  displayedColumns = ['idConfig', 'parametro', 'valor', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private configService: ConfigService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.configService.configCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.configService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(config?: Config) {
    let conf = config != null ? config : new Config();
    this.dialog.open(ConfiguracionDialogoComponent, {
      width: '250px',
      data: conf
    });
  }

  eliminar(conf: Config) {
    this.configService.eliminar(conf.idConfig).subscribe(data => {
      this.configService.listar().subscribe(medicos => {
        this.configService.configCambio.next(medicos);
        this.configService.mensajeCambio.next("Se elimino");
      });
    });
  }

}
