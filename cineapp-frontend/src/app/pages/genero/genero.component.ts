import { GeneroService } from './../../_service/genero.service';
import { Genero } from './../../_model/genero';
import { GeneroDialogoComponent } from './genero-dialogo/genero-dialogo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Genero>;
  displayedColumns = ['idGenero', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private generoService: GeneroService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.generoService.generoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.generoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.generoService.listarPageable(0, 10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(genero?: Genero) {
    let gen = genero != null ? genero : new Genero();
    this.dialog.open(GeneroDialogoComponent, {
      width: '250px',
      data: gen
    });
  }

  eliminar(genero: Genero) {
    this.generoService.eliminar(genero.idGenero).pipe(switchMap(() => {
      return this.generoService.listar();
    })).subscribe(data => {
      this.generoService.generoCambio.next(data);
      this.generoService.mensajeCambio.next("Se eliminó");
    });
  }

  mostrarMas(e : any){
    this.generoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let generos = data.content;
      this.cantidad = data.totalElements;
      
      this.dataSource = new MatTableDataSource(generos);
      this.dataSource.sort = this.sort;
    });
  }

}
