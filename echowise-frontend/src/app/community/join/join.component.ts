import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  communityCode = '';
  @Output() popupClosed = new EventEmitter<void>();
  @Output() communityJoined = new EventEmitter<void>(); 
  constructor(private authService: AuthService) { }

  joinCommunity() {
    const request = { communityCode: this.communityCode };

    this.authService.joinCommunity(request).subscribe({
      next: (response: any) => {
        console.log('Joined community successfully:', response);
        alert('Joined community successfully!');
        this.communityJoined.emit();
        this.popupClosed.emit(); // Close the popup after successful join
      },
      error: (err: any) => {
        console.error('Failed to join community:', err);
        alert('Failed to join community: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}
