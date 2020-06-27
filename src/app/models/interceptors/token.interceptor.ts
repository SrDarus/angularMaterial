
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authServices: AuthService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authServices.token
    if (token != null) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+token)
      });
      console.log("Auth", token)
      return next.handle(authReq);
    }
    return next.handle(req)
  }

}
