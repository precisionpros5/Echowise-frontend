import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  communityName = '';
  communityDescription = '';
  generatedCode = '';
  @Output() popupClosed = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  createCommunity() {
    const request = {
      name: this.communityName,
      description: this.communityDescription
    };

    this.authService.createCommunity(request).subscribe({
      next: (response: any) => {
        this.generatedCode = response.code; // Display the generated code from the backend response
        alert('Community created successfully!');
      },
      error: (err: any) => {
        alert('Failed to create community: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}