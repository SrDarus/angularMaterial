import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
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
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly url = AppSettings.API_ENDPOINT_LOCAL;

  constructor(
    public http: HttpClient,
    private router: Router,
    public utilServices: UtilService,
    private authService: AuthService
    ) { }


  //GET
  obtenerUsuario(email): Observable<any> {
    return this.http.get(this.url + 'api/usuario/obtenerUsuario/' + email)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  // GET
  obtenerUsuarios(): Observable<Result> {
    return this.http.post<Result>(this.url + 'api/usuario/obtenerUsuarios', [])
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
    return this.http.post<Result>(this.url + 'api/usuario/obtenerUsuarios/page/' + page, [])
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
    const credenciales = btoa('angularapp' + ':' + '12345')
    // console.log("credenciales", credenciales)
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + credenciales
    });
    return this.http.post<Bug>(this.url + 'api/usuario/registrarUsuario', JSON.stringify(usuario), { headers: httpHeaders })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // PUT
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log("usuario", usuario)
    usuario.foto = "a.jpg"
    usuario.password = ""
    usuario.role = []
    
    return this.http.put<Usuario>(this.url + 'api/usuario/actualizarUsuario/' + usuario.email, usuario)
  }

  eliminarUsuario(email: string): Observable<Usuario> {
  // DELLETE
    return this.http.delete<Usuario>(this.url + 'api/usuario/eliminarUsuario/' + email)
      .pipe(
        // retry(1),
        catchError(this.handleError)
      )
  }

  subirFotoUsuario(archivo: File, id: string): Observable<HttpEvent<{}>> {
    
    let formData = new FormData();
    formData.append("imagen", archivo)
    formData.append("email", id)
    
    const req = new HttpRequest('POST', this.url + 'api/usuario/img/subirFoto', formData, {
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
      alert("Debe iniciar session usuario services  ")
      // this.utilServices.messageWarning("Debe iniciar sesion")
      // this.router.navigate(['/home', {"nombre": "nombre"}])

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