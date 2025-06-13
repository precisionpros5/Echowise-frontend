// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api/auth'; // Backend URL

  constructor(private http: HttpClient) { }

  /**
   * Login method to authenticate the user.
   * Sends username and password to the backend.
   */
  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginRequest, { withCredentials: true }); // Enable credentials for cookies
  }

  /**
   * Register method to create a new user.
   * Sends username, email, and password to the backend.
   */
  register(username: string, email: string, password: string): Observable<any> {
    const signupRequest = { username, email, password };
    return this.http.post(`${this.baseUrl}/register`, signupRequest);
  }

  /**
   * Logout method to clear the JWT cookie.
   */
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }); // Enable credentials for cookies
  }
}
