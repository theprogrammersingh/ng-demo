import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(
        'eve.holt@reqres.in',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  ngOnInit(): void {
    return;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.showValidationErrors();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe((res) => {
      this.authService.setAuthToken(res.token);
      this.router.navigate(['/users']);
    });
  }

  showValidationErrors() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    if (emailControl && emailControl.invalid) {
      if (emailControl.hasError('required')) {
        this.snackbarService.show('Email is required', false);
        return;
      }
      if (emailControl.hasError('email')) {
        this.snackbarService.show('Enter a valid email', false);
        return;
      }
    }
    if (passwordControl && passwordControl.invalid) {
      if (passwordControl.hasError('required')) {
        this.snackbarService.show('Password is required', false);
        return;
      }
      if (passwordControl.hasError('minlength')) {
        this.snackbarService.show(
          'Password must be at least 6 characters',
          false
        );
        return;
      }
    }
  }
}
