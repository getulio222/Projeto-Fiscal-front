import { Component } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  errorMsg = "";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      usuario: ["", Validators.required],
      senha: ["", Validators.required],
    });
  }

  login() {
    this.errorMsg = "";
    if (this.form.invalid) {
      this.errorMsg = "Informe usuário e senha.";
      return;
    }

    this.loading = true;
    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/"]);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = "Login inválido.";
      },
    });
  }
}
