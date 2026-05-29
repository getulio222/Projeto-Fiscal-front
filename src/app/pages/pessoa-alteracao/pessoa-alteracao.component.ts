import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";

@Component({
  selector: "app-pessoa-alteracao",
  templateUrl: "./pessoa-alteracao.component.html",
  styleUrls: ["./pessoa-alteracao.component.scss"],
})
export class PessoaAlteracaoComponent implements OnInit {
  cpfBusca = "";
  msg = "";

  // dados do formulário
  idPessoa: number | null = null;
  nome = "";
  cpf = "";
  cidade = "";

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {
    // Método exigido pela interface OnInit adicionado com sucesso
  }

  buscar(): void {
    this.msg = "";

    const cpf = (this.cpfBusca || "").trim();
    if (!cpf) {
      this.msg = "CPF, necessário informar para realizar a busca;";
      return;
    }

    this.pessoaService.buscarPorCpf(cpf).subscribe({
      next: (p: any) => {
        // ii) preenche e armazena ID
        this.idPessoa = p.id;
        this.nome = p.nome;
        this.cpf = p.cpf;
        this.cidade = p.cidade;
      },
      error: () => {
        // iii) não encontrado
        this.msg = "Dados não localizado, tente novamente.";
        this.cpfBusca = "";
        this.limparFormulario();
      },
    });
  }

  salvar(): void {
    this.msg = "";

    // a) todos os campos devem estar preenchidos
    if (!this.idPessoa || !this.nome || !this.cpf || !this.cidade) {
      this.msg = "Todos os campos devem estar preenchidos.";
      return;
    }

    const payload = {
      nome: this.nome,
      cpf: this.cpf,
      cidade: this.cidade,
    };

    this.pessoaService.atualizar(this.idPessoa, payload).subscribe({
      next: () => {
        alert("Cadastro Atualizado com Sucesso");
        this.router.navigate(["/"]);
      },
      error: () => {
        this.msg = "Houve algum problema na alteração, tentar novamente.";
      },
    });
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }

  private limparFormulario(): void {
    this.idPessoa = null;
    this.nome = "";
    this.cpf = "";
    this.cidade = "";
  }
}
