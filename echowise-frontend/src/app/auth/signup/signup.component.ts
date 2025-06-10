import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  confirmPassword = ''; // Added confirmPassword field

  constructor(private authService: AuthService, private router: Router) { }

  onSignup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        console.log('Signup successful');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        alert('Signup failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
