import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Estado } from "../../models/estado.model";
import { EstadoService } from "../../services/estado.service";
import { PessoaService } from "../../services/pessoa.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
})
export class PessoaCadastroComponent implements OnInit {
  estados: Estado[] = [];
  loading = false;
  msgOk = "";
  msgErro = "";
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estadoService: EstadoService,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.maxLength(100)]],
      cpf: ["", [Validators.required]],
      cidade: ["", [Validators.required, Validators.maxLength(50)]],
      cd_estado: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.estadoService.listar().subscribe({
      next: (res) => (this.estados = res),
      error: () => (this.msgErro = "Falha ao carregar estados."),
    });
  }

  voltar() {
    this.router.navigate(["/"]);
  }

  salvar() {
    this.msgOk = "";
    this.msgErro = "";

    if (this.form.invalid) {
      this.msgErro = "Todos os campos devem estar preenchidos.";
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.pessoaService.salvar(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.msgOk = "Cadastro realizado com sucesso.";
        // opcional: voltar automaticamente
        // this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.msgErro = "Erro ao salvar. Tente novamente.";
      },
    });
  }
}
