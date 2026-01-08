import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"], // 👈 importante
})
export class LoginComponent {
  form: FormGroup;
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

  login(): void {
    this.errorMsg = "";

    if (this.form.invalid) {
      this.errorMsg = "Informe usuário e senha.";
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(["/"]),
      error: () => (this.errorMsg = "Usuário ou senha inválidos"),
    });
  }
}
