import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Ensure you have an AuthService for token validation
import { CookieService } from 'ngx-cookie-service'; // Install ngx-cookie-service if not already installed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // Check if the cookie exists
    console.log('All cookies:', this.cookieService.getAll()); const token = this.cookieService.get('precisionPros');
    console.log('Token from cookie:', token); // Debugging line to check the token
    if (token && this.authService.isTokenValid(token)) {
      console.log('Token is valid, access granted'); // Debugging line to confirm token validity
      return true; // Allow access if the token is valid
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false; // Deny access
    }
  }
}