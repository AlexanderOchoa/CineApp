import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Comida } from '../_model/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  comidaCambio = new Subject<Comida[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/comidas`;
  //url: string = `${environment.HOST}/${environment.MICRO_CRUD}/comidas`;
  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Comida[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get(`${this.url}/${id}`, {
      responseType: 'blob'
    });
  }
  /*registrar(Comida: Comida) {
    return this.http.post(this.url, Comida);
  }*/

  registrar(comida: Comida, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(comida)], { type: "application/json" });
    formdata.append('comida', comidaBlob);

    return this.http.post(`${this.url}`, formdata, {
      responseType: 'text'
    });
  }

  modificar(comida: Comida, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const comidaBlob = new Blob([JSON.stringify(comida)], { type: "application/json" });
    formdata.append('comida', comidaBlob);

    return this.http.put(`${this.url}`, formdata, {
      responseType: 'text'
    });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
