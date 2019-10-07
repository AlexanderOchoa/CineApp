import {Subject} from 'rxjs';
import {Genero} from './../_model/genero';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  generoCambio = new Subject<Genero[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/generos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Genero[]>(this.url);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`); //&sort=nombre
  }

  listarPorId(id: number) {
    return this.http.get<Genero>(`${this.url}/${id}`);
  }

  registrar(Genero: Genero) {
    return this.http.post(this.url, Genero);
  }

  modificar(Genero: Genero) {
    return this.http.put(this.url, Genero);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
