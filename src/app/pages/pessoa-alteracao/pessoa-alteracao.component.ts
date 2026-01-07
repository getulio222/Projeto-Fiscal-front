import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Estado } from "../../models/estado.model";
import { PessoaResponse } from "../../models/pessoa.model";
import { EstadoService } from "../../services/estado.service";
import { PessoaService } from "../../services/pessoa.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-pessoa-alteracao",
  templateUrl: "./pessoa-alteracao.component.html",
})
export class PessoaAlteracaoComponent implements OnInit {
  estados: Estado[] = [];
  idPessoa: number | null = null;

  msgOk = "";
  msgErro = "";

  cpfBusca = "";
  loadingBusca = false;
  loadingSalvar = false;
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

  buscar() {
    this.msgOk = "";
    this.msgErro = "";

    if (!this.cpfBusca?.trim()) {
      this.msgErro = "CPF, necessário informar para realizar a busca.";
      return;
    }

    this.loadingBusca = true;
    this.pessoaService.buscarPorCpf(this.cpfBusca.trim()).subscribe({
      next: (pessoa: PessoaResponse) => {
        this.loadingBusca = false;
        this.idPessoa = pessoa.id;

        this.form.patchValue({
          nome: pessoa.nome,
          cpf: pessoa.cpf,
          cidade: pessoa.cidade,
          cd_estado: pessoa.estado?.id,
        });
      },
      error: () => {
        this.loadingBusca = false;
        this.idPessoa = null;
        this.form.reset();
        this.cpfBusca = "";
        this.msgErro = "Dados não localizado, tente novamente.";
      },
    });
  }

  salvar() {
    this.msgOk = "";
    this.msgErro = "";

    if (!this.idPessoa) {
      this.msgErro = "Faça a busca por CPF antes de salvar.";
      return;
    }

    if (this.form.invalid) {
      this.msgErro = "Todos os campos devem estar preenchidos.";
      this.form.markAllAsTouched();
      return;
    }

    this.loadingSalvar = true;
    this.pessoaService
      .atualizar(this.idPessoa, this.form.value as any)
      .subscribe({
        next: () => {
          this.loadingSalvar = false;
          this.msgOk = "Cadastro Atualizado com Sucesso";
          // conforme requisito: OK e retornar para tela principal (aqui: retorno automático)
          setTimeout(() => this.router.navigate(["/"]), 400);
        },
        error: () => {
          this.loadingSalvar = false;
          this.msgErro = "Houve algum problema na alteração, tentar novamente.";
        },
      });
  }
}
