import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { tokenGetter } from './login.service';
import { UserService } from '../admin/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  userRole = this.get()
  get(): Observable<any> {
    const token = tokenGetter();
    return this.userService.getToken(token).pipe(
      tap((data) => {
        this.userRole = data.roleId.name ;
      }),
      catchError((error) => {
        console.log('Error:', error);
        return of(null);
      })
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = tokenGetter();
    if (token.length > 0) {
      return this.get().pipe(
        map(() => {
          if (route.data['role'] && route.data['role'].indexOf(this.userRole) === -1) {
            console.error("Erreur : Rôle non autorisé !");
            return false;
          }
          return true;
        })
      );
    } else {
      this.router.navigate(['']);
      return of(false);
    }
  }
}
