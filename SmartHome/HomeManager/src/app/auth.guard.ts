import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const authCookie = this.cookieService.get('auth-token');
    if (authCookie) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}