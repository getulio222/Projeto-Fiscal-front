import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PessoaService } from "../../services/pessoa.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@Component({
    selector: "app-pessoa-consulta",
    templateUrl: "./pessoa-consulta.component.html",
    styleUrls: ["./pessoa-consulta.component.scss"],
    imports: [ReactiveFormsModule, FormsModule]
})
export class PessoaConsultaComponent {
  cpf = "";
  msg = "";

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
        this.pessoa = res;
        this.pessoaId = res.id;
      },
      error: () => {
        this.msg = "Dados não localizado, tente novamente.";
        this.cpf = "";
        this.pessoa = null;
        this.pessoaId = null;
      },
    });
  }

  voltar(): void {
    this.router.navigate(["/"]);
  }
}
