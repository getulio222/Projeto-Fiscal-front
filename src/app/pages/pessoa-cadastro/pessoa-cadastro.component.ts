import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";
import { EstadoService } from "../../services/estado.service";

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.scss"],
})
export class PessoaCadastroComponent implements OnInit {
  msg = "";

  // Campos
  cd_estado: number | null = null;
  nome = "";
  cpf = "";
  cidade = "";

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
      next: (res: any[]) => (this.estados = res || []),
      error: () => (this.estados = []),
    });
  }

  salvar(): void {
    this.msg = "";

    const nome = (this.nome || "").trim();
    const cpf = (this.cpf || "").trim();
    const cidade = (this.cidade || "").trim();
    const cdEstado = this.cd_estado;

    // a) Todos os campos devem estar preenchidos
    if (!cdEstado || !nome || !cpf || !cidade) {
      this.msg = "Todos os campos devem estar preenchidos.";
      return;
    }

    // Regras de tamanho (PDF)
    if (nome.length > 100) {
      this.msg = "Nome deve ter no máximo 100 caracteres.";
      return;
    }
    if (cpf.length > 11) {
      this.msg = "CPF deve ter no máximo 11 caracteres.";
      return;
    }
    if (cidade.length > 50) {
      this.msg = "Cidade deve ter no máximo 50 caracteres.";
      return;
    }

    const payload = {
      nome,
      cpf,
      cidade,
      cd_estado: cdEstado,
    };

    this.pessoaService.salvar(payload).subscribe({
      next: () => {
        alert("Cadastro Realizado com Sucesso");
        this.router.navigate(["/"]);
      },
      error: () => {
        this.msg = "Houve algum problema na inclusão, tentar novamente.";
        // permanece na tela com os dados preenchidos
      },
    });
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }
}
