import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../shared/navbar/navbar.component'; // Import NavbarComponent

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent], // Add NavbarComponent to imports
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  communityName = '';
  communityDescription = '';
  generatedCode = '';

  constructor(private http: HttpClient) { }

  generateCode() {
    this.generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createCommunity() {
    const payload = {
      name: this.communityName,
      description: this.communityDescription,
      code: this.generatedCode
    };

    this.http.post('http://localhost:8080/api/communities', payload).subscribe({
      next: () => alert('Community created successfully!'),
      error: (err) => alert('Error creating community: ' + (err.error?.message || 'Unknown error'))
    });
  }
}