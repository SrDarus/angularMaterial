import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Bug } from './bug';
import { Result } from './result'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  // Base url
  baseurl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  // GET
  inisiarSesion(email): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl + '/usuario/obtenerUsuario/'+email, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // GET
  obtenerUsuarios(): Observable<Result> {
    return this.http.get<Result>(this.baseurl + '/usuario/obtenerUsuarios', this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // POST
  registrarUsuario(usuario: Usuario): Observable<Bug> {
    return this.http.post<Bug>(this.baseurl + '/usuario/registrarUsuario/', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // PUT
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.baseurl + '/usuario/actualizarUsuario', JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}