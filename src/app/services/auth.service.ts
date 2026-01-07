import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiBaseUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  login(dados: { usuario: string; senha: string }) {
    return this.http.post<any>(`${this.api}/login`, dados)
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
