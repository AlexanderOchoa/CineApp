import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = `${environment.HOST}/usuarios`;

  constructor(private http: HttpClient) { }

  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }

  obtenerFoto(id) {
    return this.http.get(`${this.url}/foto/${id}`, {
      responseType: 'blob'
    });
  }

  modificar(usuario: Usuario, file?: File) {
    let formData: FormData = new FormData();
    formData.append('file', file);

    const usuarioBlob = new Blob([JSON.stringify(usuario)], {type: "application/json"});
    formData.append('usuario', usuarioBlob);

    return this.http.put(`${this.url}`, formData, {
      responseType: 'text'
    });
  }

}
