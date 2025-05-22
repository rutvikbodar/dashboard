import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApiService, LoginResponse } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'user_email';

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.apiService.login(email, password).pipe(
      tap(response => {
        if (response.token && response.user.email) {
          // Store the complete cookie string
          const cookieString = `authToken=${response.token}; Path=/; HttpOnly; Expires=Thu, 26 May 2025 06:06:46 GMT;`;
          this.setAuthData(cookieString, response.user.email);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  setAuthData(token: string, email: string): void {
    console.log('Storing token:', token);
    this.cookieService.set(this.TOKEN_KEY, token);
    this.cookieService.set(this.USER_KEY, email);
  }

  getToken(): string {
    const cookieString = this.cookieService.get(this.TOKEN_KEY);
    console.log('Retrieved token:', cookieString);
    return cookieString;
  }

  getUserEmail(): string {
    return this.cookieService.get(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check(this.TOKEN_KEY);
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/auth/login']);
  }
} 