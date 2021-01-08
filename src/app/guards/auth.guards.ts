// import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(localStorage['token'], 'token');
    console.log("VALIDATE");

    console.log(localStorage['token'] != null);

    if (localStorage['token'] != null) {
      return true;
    } else {
      return false;
      this.router.navigate(['/login']);
    }

  }

}
