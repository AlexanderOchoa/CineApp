import { Cliente } from './cliente';
import { Pelicula } from './pelicula';
import { DetalleVenta } from './detalleVenta';

export class Venta {
    idVenta: number;
    fecha: string;
    cliente: Cliente;
    pelicula: Pelicula;
    cantidad: number;
    total: number;
    detalle: DetalleVenta[];
}