import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServices: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authServices.isAuthenticated()) {
      if (this.tokenExpirado()) {
        this.authServices.cerrarSesion()
        this.router.navigate(['/home'])
        return false
      }
      return true;
    } else {
      this.router.navigate(['/home'])    
    }
  }

  tokenExpirado(): boolean {
    let token = this.authServices.token
    let payload = this.authServices.obtenerDatosToken(token)
    let now = new Date().getTime() / 1000
    if (payload.exp < now) {
      return true
    }
    return false
  }
  
}
