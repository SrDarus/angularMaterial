import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { Bug } from './bug';
import { Result } from './result'
import { Usuario } from '../models/usuario';
import { AppSettings } from '../app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  // Base url
  readonly baseurl = AppSettings.API_ENDPOINT_LOCAL;

  constructor(
    private http: HttpClient, 
    private router: Router) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  

  // // POST
  // inisiarSesion(email): Observable<Bug> {
  //   console.log(this.baseurl + '/oauth/token/' + email)
  //   return this.http.post<Bug>(this.baseurl + '/oauth/token/', {} ,this.httpOptions)
  //     .pipe(
  //       // retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  //GET
  obtenerUsuario(email): Observable<Bug> {
    return this.http.get<Bug>(this.baseurl + '/usuario/obtenerUsuario/' + email, this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  // GET
  obtenerUsuarios(): Observable<Result> {
    return this.http.post<Result>(this.baseurl + '/usuario/obtenerUsuarios', [], this.httpOptions)
      .pipe(
        // retry(1),
        map((response: any) => {
//          console.log('response', response)
          // let _response = response
          response.result.map(usuario => {
            usuario.fechaNacimiento = formatDate(usuario.fechaNacimiento, "dd-MM-yyyy", "en-US")
            usuario.fechaCreacion = formatDate(usuario.fechaCreacion, "dd-MM-yyyy", "en-US")
            return usuario as Usuario
          });
          return response
        }),
        catchError(this.handleError)
      )
  }

  // GET
  obtenerUsuariosBack(page): Observable<Result> {
    return this.http.post<Result>(this.baseurl + '/usuario/obtenerUsuarios/page/' + page, [], this.httpOptions)
      .pipe(
        // retry(1),
        map((response: any) => {
          // console.log('response', response)
          // let _response = response
          response.result.content.map(usuario => {
            usuario.fechaNacimiento = formatDate(usuario.fechaNacimiento, "dd-MM-yyyy", "en-US")
            usuario.fechaCreacion = formatDate(usuario.fechaCreacion, "dd-MM-yyyy", "en-US")
            return usuario as Usuario
          });
          return response
        }),
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
    return this.http.put<Usuario>(this.baseurl + '/usuario/actualizarUsuario/' + usuario.email, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  // DELLETE
  eliminarUsuario(email: string): Observable<Usuario> {
    return this.http.delete<Usuario>(this.baseurl + '/usuario/eliminarUsuario/' + email, this.httpOptions)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  subirFotoUsuario(archivo: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("imagen", archivo)
    formData.append("email", id)
    //console.log("FormData", formData)
    const req = new HttpRequest('POST', this.baseurl + '/usuario/subirFoto/', formData, {
      reportProgress: true
    });
    return this.http.request<Result>(req)
  }


  handleError(error) {
    let errorMessage = { status: 500, message: null, result: null };
    if (error.error instanceof ErrorEvent) {
      errorMessage.result = error
      errorMessage.message = `Error: ${error.error.message}`;
      if(error.status === 401 || error.status === 403){
        this.router.navigate(["/home"])
      }
    } else {

      errorMessage.result = error
      errorMessage.message = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log('handleError', errorMessage);
    return throwError(errorMessage);
  }

}