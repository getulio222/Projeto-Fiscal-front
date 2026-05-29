export interface PessoaRequest {
  nome: string;
  cpf: string;
  cidade: string;
}

export interface PessoaResponse {
  id: number;
  nome: string;
  cpf: string;
  cidade: string;
}
