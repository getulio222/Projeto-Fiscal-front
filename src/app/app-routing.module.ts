import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./security/auth.guard";

import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { PessoaCadastroComponent } from "./pages/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaAlteracaoComponent } from "./pages/pessoa-alteracao/pessoa-alteracao.component";
import { PessoaConsultaComponent } from "./pages/pessoa-consulta/pessoa-consulta.component";
import { PessoaExclusaoComponent } from "./pages/pessoa-exclusao/pessoa-exclusao.component";
import { PessoaListagemComponent } from "./pages/pessoa-listagem/pessoa-listagem.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "pessoa/cadastro",
    component: PessoaCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pessoa/alteracao",
    component: PessoaAlteracaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pessoa/consulta",
    component: PessoaConsultaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pessoa/exclusao",
    component: PessoaExclusaoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "pessoa/listagem",
    component: PessoaListagemComponent,
    canActivate: [AuthGuard],
  },

  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
