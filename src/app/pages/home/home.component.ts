import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    imports: [RouterLink]
})
export class HomeComponent {
  constructor(private router: Router) {}

  sair(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
