import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Bug } from './bug';
import { Result } from './result'

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
  obtenerUsuarios(): Observable<Result> {
    return this.http.get<Result>(this.baseurl + '/usuario/obtenerUsuarios', this.httpOptions)
      .pipe(
        retry(1),
        //catchError(this.errorHandl)
      )
  }

  // POST
  registrarUsuario(data): Observable<Bug> {
    return this.http.post<Bug>(this.baseurl + '/bugtracking/', JSON.stringify(data), this.httpOptions)
      .pipe(
        //catchError(this.errorHandl)
      )
  }

}