// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AlertService } from '../../shared/alert/alert.service'; // Import AlertService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService // Inject AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
      ]],
      password: [
        '',
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.alertService.showAlert('Please fill out the form correctly.', 'error'); // Custom alert for invalid form
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log('Login Form Value:', this.loginForm.value); // Log the form value for debugging
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        this.alertService.showAlert('Login successful!!', 'success'); // Custom alert for successful login
        this.router.navigate(['/community/home']); // Navigate to the landing page after successful login
      },
      error: (err: any) => {
        console.error('Login failed:', err);
        this.alertService.showAlert('Login failed: ' + (err.error || 'Unknown error'), 'error'); // Custom alert for login failure
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}