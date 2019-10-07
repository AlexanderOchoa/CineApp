import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {Rol} from '../_model/rol';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol[]>();
  url: string = `${environment.HOST}`;

  constructor(private http: HttpClient) { }

  listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post<Rol[]>(`${this.url}/roles/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
