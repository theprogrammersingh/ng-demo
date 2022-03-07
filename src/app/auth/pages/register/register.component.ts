import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = new FormGroup({
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

  register(): void {
    if (this.registerForm.invalid) {
      this.showValidationErrors();
      return;
    }
    const { email, password } = this.registerForm.value;
    this.authService.registerUser({ email, password }).subscribe((res) => {
      this.snackbarService.show(
        'Registration successful! Please login to continue.',
        true,
        5000
      );
      this.authService.setAuthToken(res.token);
      this.router.navigate(['/users']);
    });
  }

  showValidationErrors() {
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
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
