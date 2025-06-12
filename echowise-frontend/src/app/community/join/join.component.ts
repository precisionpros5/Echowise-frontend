import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../shared/navbar/navbar.component'; // Import NavbarComponent
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent], // Add NavbarComponent to imports
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  communityCode = '';

  constructor(private http: HttpClient) { }

  joinCommunity() {
    this.http.post(`http://localhost:8080/api/communities/${this.communityCode}/join`, {}).subscribe({
      next: () => alert('Joined community successfully!'),
      error: (err) => alert('Error joining community: ' + (err.error?.message || 'Unknown error'))
    });
  }
}
