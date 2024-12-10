import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login'; // Symfony login endpoint

  constructor(private http: HttpClient) {}

  // Login function
  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, credentials, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token); // Store JWT token
        }
      }),
      catchError(this.handleError)
    );
  }

  // Get the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Logout by removing the token
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Login failed; please try again.');
  }
}
