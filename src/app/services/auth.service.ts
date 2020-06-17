import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.config';
import { Bug } from './bug';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  readonly baseurl = AppSettings.API_ENDPOINT_LOCAL;

  constructor( 
    private http: HttpClient,
    private router: Router) { }

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

  handleError(error) {
    alert(1)
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
