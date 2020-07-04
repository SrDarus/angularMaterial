import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UtilService } from 'src/app/utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    public authServices: AuthService,
    private router: Router,
    public utilService: UtilService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authServices.isAuthenticated()) {
      return false;
    }

    let role = next.data['role'] as string
    if (this.authServices.hasRole(role)) {
      return true
    }
    this.utilService.messageBad("No cuanta con los permisos necesarios")
    this.router.navigate(['/main'])
    return false;
  }

}
