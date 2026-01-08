import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";

@Component({
  selector: "app-pessoa-exclusao",
  templateUrl: "./pessoa-exclusao.component.html",
  styleUrls: ["./pessoa-exclusao.component.scss"],
})
export class PessoaExclusaoComponent {
  cpf = "";
  msg = "";

  // dados carregados (campos desabilitados)
  pessoa: any = null;
  pessoaId: number | null = null;

  constructor(private pessoaService: PessoaService, private router: Router) {}

  buscar(): void {
    this.msg = "";
    this.pessoa = null;
    this.pessoaId = null;

    const cpf = (this.cpf || "").trim();
    if (!cpf) {
      this.msg = "CPF, necessário informar para realizar a busca;";
      return;
    }

    this.pessoaService.buscarPorCpf(cpf).subscribe({
      next: (res: any) => {
        // i) preencher dados na tela
        // ii) armazenar o ID correspondente
        // iii) campos ficam desabilitados (no HTML usamos [disabled]="true")
        this.pessoa = res;
        this.pessoaId = res.id;
      },
      error: () => {
        // iii) caso não encontrado
        this.msg = "Dados não localizado, tente novamente.";
        this.cpf = "";
        this.pessoa = null;
        this.pessoaId = null;
      },
    });
  }

  excluir(): void {
    this.msg = "";

    if (!this.pessoaId) {
      this.msg = "Busque um cadastro através do CPF antes de excluir.";
      return;
    }

    // a) pergunta
    const confirmar = confirm("Deseja realmente excluir o registro?");

    // ii) Não, permanece na tela com os dados preenchidos
    if (!confirmar) return;

    // i) Sim, chama endpoint de exclusão
    this.pessoaService.excluir(this.pessoaId).subscribe({
      next: () => {
        alert("Cadastro Excluído com Sucesso");
        this.router.navigate(["/"]); // retorna tela principal
      },
      error: () => {
        this.msg = "Houve algum problema na exclusão, tentar novamente.";
        // permanece na tela com dados preenchidos
      },
    });
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }
}
