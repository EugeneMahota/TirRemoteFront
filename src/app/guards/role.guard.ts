import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const rolesAccess = next.data['roles'];
    const rolesUser = this.authService.getListRole();

    let result: boolean;

    result = false;

    for (let i = 0; rolesUser.length > i; i++) {
      if (rolesAccess.find(x => x.code === rolesUser[i].code) !== undefined) {
        result = true;
      }
    }

    if (result) {
      return true;
    } else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }
}
