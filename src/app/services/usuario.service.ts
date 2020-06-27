import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { Bug } from './bug';
import { Result } from './result'
import { Usuario } from '../models/usuario';
import { AppSettings } from '../app.config';
import { Router } from '@angular/router';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  // Base url
  readonly baseurl = AppSettings.API_ENDPOINT_LOCAL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilServices: UtilService
    ) { }


  //GET
  obtenerUsuario(email): Observable<any> {
    return this.http.get(this.baseurl + 'api/usuario/obtenerUsuario/' + email)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  // GET
  obtenerUsuarios(): Observable<Result> {
    return this.http.post<Result>(this.baseurl + 'api/usuario/obtenerUsuarios', [])
      .pipe(
        // retry(1),
        map((response: any) => {
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
    return this.http.post<Result>(this.baseurl + 'api/usuario/obtenerUsuarios/page/' + page, [])
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
    return this.http.post<Bug>(this.baseurl + 'api/usuario/registrarUsuario/', JSON.stringify(usuario))
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // PUT
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log("usuario", usuario)
    return this.http.put<Usuario>(this.baseurl + 'api/usuario/actualizarUsuario/' + usuario.email, JSON.stringify(usuario))
  }

  eliminarUsuario(email: string): Observable<Usuario> {
  // DELLETE
    return this.http.delete<Usuario>(this.baseurl + 'api/usuario/eliminarUsuario/' + email)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  subirFotoUsuario(archivo: File, id: string): Observable<HttpEvent<{}>> {
    
    let formData = new FormData();
    formData.append("imagen", archivo)
    formData.append("email", id)
    
    const req = new HttpRequest('POST', this.baseurl + 'api/usuario/img/subirFoto', formData, {
      reportProgress: true
    });
    return this.http.request(req).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }


  handleError(error) {
    console.log("error: ", error)
    let errorMessage = { status: error.status, message: null, result: null };
    if (error.status === 0) {
      alert("Problemas con el servidor contacte con el administrador")
      this.utilServices.messageBad("Problemas con el servidor contacte con el administrador")
      return
    }
    if (error.status === 401) {
      alert("Debe iniciar session")
      this.utilServices.messageWarning("Debe iniciar sesion")

    }
    if (error.error instanceof ErrorEvent) {
      errorMessage.result = error 
      errorMessage.message = `Error: ${error.error.message}`;
      if (error.status === 401 || error.status === 403) {
        console.log("*******************************")
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