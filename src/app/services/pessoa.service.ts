import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PessoaRequest, PessoaResponse } from '../models/pessoa.model';

@Injectable({ providedIn: 'root' })
export class PessoaService {

  private api = `${environment.apiBaseUrl}/api/v1/pessoas`;

  constructor(private http: HttpClient) {}

  salvar(dados: PessoaRequest) {
    return this.http.post<PessoaResponse>(this.api, dados);
  }

  listar() {
    return this.http.get<PessoaResponse[]>(this.api);
  }

  buscarPorCpf(cpf: string) {
    return this.http.get<PessoaResponse>(`${this.api}/cpf/${cpf}`);
  }

  buscarPorNome(nome: string) {
    return this.http.get<PessoaResponse[]>(`${this.api}/nome?valor=${encodeURIComponent(nome)}`);
  }

  atualizar(id: number, dados: PessoaRequest) {
    return this.http.put<PessoaResponse>(`${this.api}/${id}`, dados);
  }

  excluir(id: number) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
