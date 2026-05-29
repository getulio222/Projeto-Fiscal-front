import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";

import { PessoaCadastroComponent } from "./pages/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaAlteracaoComponent } from "./pages/pessoa-alteracao/pessoa-alteracao.component";
import { PessoaConsultaComponent } from "./pages/pessoa-consulta/pessoa-consulta.component";
import { PessoaExclusaoComponent } from "./pages/pessoa-exclusao/pessoa-exclusao.component";

import { AuthInterceptor } from "./security/auth.interceptor";
import { PessoaListagemComponent } from "./pages/pessoa-listagem/pessoa-listagem.component";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule, LoginComponent,
        HomeComponent,
        PessoaCadastroComponent,
        PessoaAlteracaoComponent,
        PessoaConsultaComponent,
        PessoaExclusaoComponent,
        PessoaListagemComponent], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
