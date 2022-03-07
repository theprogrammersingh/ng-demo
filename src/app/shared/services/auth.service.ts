import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../models/IAuth.model';
import { ICredentials } from '../models/ICredentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(data: ICredentials): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.baseUrl}register`, data);
  }

  login(data: ICredentials): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.baseUrl}login`, data);
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
  }

  setAuthToken(token: string): void {
    localStorage.setItem('token', token);
  }

  autoLogin(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/users']);
    }
  }
}
