import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@Component({
    selector: "app-pessoa-cadastro",
    templateUrl: "./pessoa-cadastro.component.html",
    styleUrls: ["./pessoa-cadastro.component.scss"],
    imports: [ReactiveFormsModule, FormsModule]
})
export class PessoaCadastroComponent implements OnInit {
  msg = "";

  // Campos
  nome = "";
  cpf = "";
  cidade = "";

  constructor(private pessoaService: PessoaService, private router: Router) {}

  ngOnInit(): void {
    // Método de carregamento de estados removido
  }

  salvar(): void {
    this.msg = "";

    const nome = (this.nome || "").trim();
    const cpf = (this.cpf || "").trim();
    const cidade = (this.cidade || "").trim();

    // a) Todos os campos devem estar preenchidos
    if (!nome || !cpf || !cidade) {
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
    };

    this.pessoaService.salvar(payload).subscribe({
      next: () => {
        alert("Cadastro Realizado com Sucesso");
        this.router.navigate(["/"]);
      },
      error: () => {
        this.msg = "Houve algum problema na inclusão, tentar novamente.";
      },
    });
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }
}
