import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";
import { EstadoService } from "../../services/estado.service";

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
  cd_estado: number | null = null;

  estados: any[] = [];

  constructor(
    private pessoaService: PessoaService,
    private estadoService: EstadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEstados();
  }

  carregarEstados(): void {
    this.estadoService.listar().subscribe({
      next: (res: any[]) => (this.estados = res),
      error: () => (this.estados = []),
    });
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
        this.cd_estado = p.estado?.id || null;
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
    if (
      !this.idPessoa ||
      !this.nome ||
      !this.cpf ||
      !this.cidade ||
      !this.cd_estado
    ) {
      this.msg = "Todos os campos devem estar preenchidos.";
      return;
    }

    const payload = {
      nome: this.nome,
      cpf: this.cpf,
      cidade: this.cidade,
      cd_estado: this.cd_estado,
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
    this.cd_estado = null;
  }
}
