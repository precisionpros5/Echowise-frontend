// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule, RouterLink } from '@angular/router'; // Combined RouterModule and RouterLink
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { AlertComponent } from '../../shared/alert/alert.component'; // Included but not used in template, causes warning

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    NavbarComponent,
    InputFieldComponent,
    ButtonComponent,
    AlertComponent // You can remove this if you don't use it to get rid of the warning
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Add this if you have styles, or remove if not needed
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        this.router.navigate(['/landing']);
      },
      error: (err: any) => {
        alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}