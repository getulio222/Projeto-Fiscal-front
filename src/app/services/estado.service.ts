import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Estado } from '../models/estado.model';

@Injectable({ providedIn: 'root' })
export class EstadoService {
  private api = `${environment.apiBaseUrl}/api/v1/estados`;

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Estado[]>(this.api);
  }
}
