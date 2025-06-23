// src/app/shared/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropdown = false;

  constructor(private authService: AuthService, private router: Router) { }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log('Dropdown visibility:', this.showDropdown); // Debugging output
  }

  navigateTo(route: string) {
    console.log(`Navigating to: ${route}`);
    this.router.navigate([route]);
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: (res: any) => {
        console.log('Logout successful', res);
        this.router.navigate(['']); // Redirect to the landing page after successful logout
      },
      error: (err: any) => {
        alert('Logout failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
