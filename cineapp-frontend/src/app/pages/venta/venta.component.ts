import { ConfigService } from './../../_service/config.service';
import { DetalleVenta } from './../../_model/detalleVenta';
import { Venta } from './../../_model/venta';
import { PeliculaService } from 'src/app/_service/pelicula.service';
import { ClienteService } from './../../_service/cliente.service';
import { ComidaService } from './../../_service/comida.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Cliente } from './../../_model/cliente';
import { Comida } from './../../_model/comida';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/_model/pelicula';
import { VentaService } from 'src/app/_service/venta.service';
import * as moment from 'moment';
import { VentaDTO } from 'src/app/_model/ventaDTO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tercerFormGroup: FormGroup;

  hidden: number;
  clientes: Cliente[];
  peliculas: Pelicula[];
  asientos: number[] = [];
  comidas: Comida[];
  clienteSeleccionado: Cliente;
  peliculaSeleccionada: Pelicula;
  asientosSeleccionados: number[] = [];
  comidasSeleccionadas: Comida[] = [];
  precioEntrada: number;
  precioTotal: number;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, 
    private peliculaService: PeliculaService, private comidaService: ComidaService, 
    private sanitization: DomSanitizer, private ventaService: VentaService,
    private configService : ConfigService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.tercerFormGroup = this.formBuilder.group({
      tercerCtrl: ['']
    });

    this.listarClientes();
    this.listarPeliculas();
    this.listarComidas();

    this.asientosSeleccionados = [];
    for (let i = 1; i <= 100; i++) {
      this.asientos.push(i);
    }

    this.configService.leerParametro(environment.PRECIO_ENTRADA).subscribe(data => {
      this.precioEntrada = +data.valor;
    });
  }

  listarPeliculas() {
    this.peliculaService.listar().subscribe(data => {
      this.peliculas = data;
    });
  }

  listarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  listarComidas() {
    this.comidaService.listar().subscribe(data => {
      this.comidas = data;
      for (let c of this.comidas) {
        this.comidaService.listarPorId(c.idComida).subscribe(data => {

          let reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            let x = reader.result;
            c._foto = this.setear(x);
            c._isFoto = true;
          }
        });
      }
    });

  }

  setear(x: any) {
    return this.sanitization.bypassSecurityTrustResourceUrl(x);
  }

  seleccionarPelicula(pelicula: Pelicula) {
    this.peliculaSeleccionada = pelicula;
  }

  seleccionarAsiento(asiento: number) {

    if (this.asientosSeleccionados.includes(asiento)) {
      //eliminando el asiento si ya esta seleccionado
      this.asientosSeleccionados.splice(this.asientosSeleccionados.indexOf(asiento), 1);
      //siempre guardo el tamaño de la lista de asientos seleccionados en un hidden
      this.hidden = this.asientosSeleccionados.length;
    } else {
      this.asientosSeleccionados.push(asiento);
      //siempre guardo el tamaño de la lista de asientos seleccionados en un hidden
      this.hidden = this.asientosSeleccionados.length;
    }
    this.precioTotal = this.precioEntrada * this.asientosSeleccionados.length;
  }

  seleccionarComida(e: any, c: Comida) {
    if (e.checked) {
      this.comidasSeleccionadas.push(c);
      this.precioTotal = this.precioTotal + c.precio;
    } else {
      this.precioTotal = this.precioTotal - c.precio;
    }
  }

  registrar() {

    let venta = new Venta();
    venta.cliente = this.clienteSeleccionado;
    venta.fecha = moment().format('YYYY-MM-DDTHH:mm:ss');
    venta.cantidad = this.asientosSeleccionados.length;
    venta.pelicula = this.peliculaSeleccionada;
    venta.total = this.precioTotal;

    let detalles: DetalleVenta[] = [];
    for (let a of this.asientosSeleccionados) {
      let detalle = new DetalleVenta();
      detalle.asiento = a;
      detalles.push(detalle);
    }
    venta.detalle = detalles;

    let ventaDTO = new VentaDTO();
    ventaDTO.venta = venta;
    ventaDTO.lstComidas = this.comidasSeleccionadas;
    this.ventaService.registrar(ventaDTO).subscribe(() => {  
      this.generarReporte(ventaDTO);
    });
  }

  generarReporte(ventaDTO: VentaDTO) {
    this.ventaService.generarReporte(ventaDTO).subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;')
      a.href = url;
      a.download = 'venta.pdf';
      a.click();
    });
  }

}
