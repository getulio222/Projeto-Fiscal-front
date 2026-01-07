import { Estado } from './estado.model';

export interface PessoaRequest {
  nome: string;
  cpf: string;
  cidade: string;
  cd_estado: number;
}

export interface PessoaResponse {
  id: number;
  nome: string;
  cpf: string;
  cidade: string;
  estado: Estado;
}
