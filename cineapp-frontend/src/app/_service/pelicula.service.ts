import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pelicula } from '../_model/pelicula';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  url: string = `${environment.HOST}/peliculas`;
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/peliculas`;
  
  peliculaCambio = new Subject<Pelicula[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Pelicula[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Pelicula>(`${this.url}/${id}`);
  }

  registrar(pelicula: Pelicula) {
    return this.http.post(this.url, pelicula);
  }

  modificar(pelicula: Pelicula) {
    return this.http.put(this.url, pelicula);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
