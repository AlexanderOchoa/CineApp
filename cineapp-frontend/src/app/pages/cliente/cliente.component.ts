import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteService} from '../../_service/cliente.service';
import {Cliente} from '../../_model/cliente';
import {ClienteDialogoComponent} from './cliente-dialogo/cliente-dialogo.component';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cantidad: number;
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['idCliente', 'nombres', 'dni', 'fechaNacimiento', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private clienteService: ClienteService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource<Cliente>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000});
    });

    this.ngListarCliente();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngListarCliente() {
    this.clienteService.listarPageable(0, 10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  mostrarMas(e : any){
    this.clienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      let generos = data.content;
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(generos);
      this.dataSource.sort = this.sort;
    });
  }

  ngMostrarDialogo(cliente?: Cliente) {
    let clienteRequest = (cliente != null && cliente != undefined) ? cliente : new Cliente();
    this.dialog.open(ClienteDialogoComponent, {
      width: '400px',
      data: clienteRequest
    });
  }

  eliminar(cliente: Cliente) {
    this.clienteService.eliminar(cliente.idCliente).pipe(switchMap(() => {
      return this.clienteService.listar();
    })).subscribe(data => {
      this.clienteService.clienteCambio.next(data);
      this.clienteService.mensajeCambio.next('Se eliminó.');
    });
  }

}
