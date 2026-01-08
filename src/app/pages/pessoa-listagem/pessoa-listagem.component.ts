import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";

type PessoaLinha = {
  id: number;
  nome: string;
  cpf: string;
  cidade: string;
};

@Component({
  selector: "app-pessoa-listagem",
  templateUrl: "./pessoa-listagem.component.html",
  styleUrls: ["./pessoa-listagem.component.scss"],
})
export class PessoaListagemComponent {
  nome = "";
  cpf = "";
  msg = "";

  qtd = 0;
  resultados: PessoaLinha[] = [];

  constructor(private pessoaService: PessoaService, private router: Router) {}

  buscar(): void {
    this.msg = "";
    this.resultados = [];
    this.qtd = 0;

    const nome = (this.nome || "").trim();
    const cpf = (this.cpf || "").trim();

    // a) Deve preencher Nome ou CPF
    if (!nome && !cpf) {
      this.msg = "Deverá preencher Nome ou CPF para realizar a busca;";
      return;
    }

    // Se CPF foi informado, prioriza CPF (resultado único)
    if (cpf) {
      this.pessoaService.buscarPorCpf(cpf).subscribe({
        next: (p: any) => {
          this.resultados = [
            {
              id: p.id,
              nome: p.nome,
              cpf: p.cpf,
              cidade: p.cidade,
            },
          ];
          this.qtd = this.resultados.length;
        },
        error: () => {
          this.msg = "Dados não localizado, tente novamente.";
          // permanece na tela (não limpa campos)
        },
      });
      return;
    }

    // Senão, busca por nome (lista)
    this.pessoaService.buscarPorNome(nome).subscribe({
      next: (lista: any[]) => {
        const mapped = (lista || []).map((p) => ({
          id: p.id,
          nome: p.nome,
          cpf: p.cpf,
          cidade: p.cidade,
        }));

        if (!mapped.length) {
          this.msg = "Dados não localizado, tente novamente.";
          return;
        }

        this.resultados = mapped;
        this.qtd = this.resultados.length;
      },
      error: () => {
        this.msg = "Dados não localizado, tente novamente.";
      },
    });
  }

  limpar(): void {
    this.nome = "";
    this.cpf = "";
    this.msg = "";
    this.qtd = 0;
    this.resultados = [];
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }
}
