import {Cliente} from './../_model/cliente';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/clientes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(this.url);
  }

  listarPageable(page: number, size: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${page}&size=${size}`);
  }

  registrar(cliente: Cliente, file?: File) {
    let formData: FormData = new FormData();
    formData.append('file', file);

    const clienteBlob = new Blob([JSON.stringify(cliente)], {type: "application/json"});
    formData.append('cliente', clienteBlob);

    return this.http.post(`${this.url}`, formData, {responseType: 'text'});
  }

  modificar(cliente: Cliente, file?: File) {
    let formData: FormData = new FormData();
    formData.append('file', file);

    const clienteBlob = new Blob([JSON.stringify(cliente)], {type: "application/json"});
    formData.append('cliente', clienteBlob);

    return this.http.put(`${this.url}`, formData, {responseType: 'text'});
  }

  obtenerFoto(id) {
    return this.http.get(`${this.url}/foto/${id}`, {responseType: 'blob'});
  }

  eliminar(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
