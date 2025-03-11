import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {LoginPageAuthInterface} from "./interface/login-page-auth-interface";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)

  form = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.get('username')!.value ?? '';
      const password = this.form.get('password')!.value ?? '';

      if (username.trim() === '' || password.trim() === '') {
        return;
      }

      const loginData: LoginPageAuthInterface = {
        username,
        password
      };
      this.authService.login(loginData)
        .subscribe(res => {
          console.log(res)
      });
    }
  }
}
