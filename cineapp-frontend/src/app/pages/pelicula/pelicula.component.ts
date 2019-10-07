import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Pelicula } from 'src/app/_model/pelicula';
import { PeliculaService } from 'src/app/_service/pelicula.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Pelicula>;
  displayedColumns = ['idPelicula', 'nombre', 'genero', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private peliculaService: PeliculaService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.peliculaService.peliculaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.peliculaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.peliculaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  eliminar(idPelicula: number) {
    this.peliculaService.eliminar(idPelicula).subscribe(() => {
      this.peliculaService.listar().subscribe(data => {
        this.peliculaService.peliculaCambio.next(data);
        this.peliculaService.mensajeCambio.next('Se eliminó');
      });
    });
  }

 
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
