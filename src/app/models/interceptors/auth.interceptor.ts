
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { UtilService } from 'src/app/utils/util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public authService: AuthService,
    public utilService: UtilService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error("Method not implemented.");
    return next.handle(req).pipe(
      catchError(e => {
        // console.log("eee", e)
        if (e.status == 401) {
          if (!this.authService.isAuthenticated()) {
            this.authService.cerrarSesion();
            this.router.navigate(['/main']);
          }
        }
    
        if (e.status == 403) {
          this.utilService.messageBad("No tienes acceso a este recurso")
          // this.router.navigate(['/clientes']);
        }
        return throwError(e)
      })
    )
  }

}
