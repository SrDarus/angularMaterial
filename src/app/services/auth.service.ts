import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.config';
import { Bug } from './bug';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { UtilService } from '../utils/util.service';

@Injectable({   
  providedIn: 'root'
})
export class AuthService {
  
  readonly baseurl = AppSettings.API_ENDPOINT_LOCAL;

  private _usuario: Usuario
  private _token: string

  historial = new BehaviorSubject(this.usuario);

  constructor( 
    private http: HttpClient,
    private router: Router,
    private utilServices: UtilService) { }
  
  


  login(email:string, password:string):Observable<any>{
    const credenciales = btoa('angularapp' + ':' + '12345')
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+credenciales
       })
    }    
    let params = new URLSearchParams()
    params.set('username', email)
    params.set('password', password)
    params.set('grant_type', 'password')
    
    return this.http.post<Bug>(this.baseurl + "oauth/token", params.toString(), httpOptions)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  guardarUsuario(accessToken) { 
    let payload = this.obtenerDatosToken(accessToken);
    console.log("payload", payload)
    this._usuario = new Usuario(
      payload.user_name,  
      payload.authorities,
      null,//rut
      payload.nombre,
      payload.apellido,
      payload.fechaNacimiento,
      null,//fechaCreacion
      payload.foto
    );
    this.historial.next(this._usuario); // this will make sure to tell every subscriber about the change.
    //this.sesion = JSON.stringify(this._usuario)
    sessionStorage.setItem("usuario", JSON.stringify(this._usuario))
  }

  guardarToken(accessToken) { 
    this._token = accessToken
    sessionStorage.setItem("token", this._token)
  }

  obtenerDatosToken(accessToken) {
    if (accessToken != null) {      
      return JSON.parse(atob(accessToken.split('.')[1]))
    }
    return null
  }
 

  public get usuario():Usuario { 
    if (this._usuario! != null) {
      return this._usuario
    } else {
      if (this._usuario == null && sessionStorage.getItem("usuario") != null) {
        this._usuario = JSON.parse(sessionStorage.getItem("usuario")) as Usuario
        return this._usuario
      }
    }
    return null
  }

  public get token(): string{
    if (this._token! != null) {
      return this._token
    } else {
      if (this._token == null && sessionStorage.getItem("token") != null) {
        this._token = sessionStorage.getItem("token")
        return this._token
      }
    }
    return null
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token)
    // console.log("payload  ", payload)
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true
    }
    return false
  }

  hasRole(role: string): boolean {
    console.log("role", role)
    console.log("usuario", this.usuario)
    if (this.usuario === null) return false
    if (this.usuario.role.includes(role)) {
      // alert(1) 
      return true;
    }
    // alert(2)
    return false
  } 

  cerrarSesion() { 
    sessionStorage.removeItem('sesion');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    this.historial.next(null); // this will make sure to tell every subscriber about the change.
  }

  handleError(error) {
    let errorMessage = { status: error.status, message: null, result: null };
    if (error.status === 0) {
      alert("Problemas con el servidor contacte con el administrador")
      this.utilServices.messageBad("Problemas con el servidor contacte con el administrador")
      return
    }
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
