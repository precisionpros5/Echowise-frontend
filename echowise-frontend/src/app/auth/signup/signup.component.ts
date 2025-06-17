import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alert/alert.service'; // Import AlertService

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService // Inject AlertService
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]], // Ensure 'email' control is defined
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
          ]
        ],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.alertService.showAlert('Please fill out the form correctly.', 'error'); // Custom alert for invalid form
      return;
    }

    const { username, email, password } = this.signupForm.value;
    this.authService.register(username, email, password).subscribe({
      next: (res: any) => {
        console.log('Signup successful', res);
        this.alertService.showAlert('Sign Up successful!! Please log in.', 'success'); // Custom alert for successful signup
        this.router.navigate(['/login']); // Navigate to the login page after successful signup
      },
      error: (err: any) => {
        console.error('Signup failed:', err);
        this.alertService.showAlert('Sign Up failed: ' + (err.error?.message || 'Unknown error'), 'error'); // Custom alert for signup failure
      }
    });
  }
}
