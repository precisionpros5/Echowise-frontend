import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../shared/alert/alert.service';

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
  constructor(private authService: AuthService, private alertService: AlertService) { }

  joinCommunity() {
    const request = { communityCode: this.communityCode };

    if (!this.communityCode.trim()) {
      this.alertService.showAlert('Community Code is required.', 'error'); // Use AlertService
      return;
    }
    if (this.communityCode.length < 3 || this.communityCode.length > 6) {
      this.alertService.showAlert('Community Code must be between 3 and 6 digits.', 'error'); // Use AlertService
      return;
    }

    this.authService.joinCommunity(request).subscribe({
      next: (response: any) => {
        console.log('Joined community successfully:', response);
        alert('Joined community successfully!');
        this.communityJoined.emit();
        this.popupClosed.emit(); // Close the popup after successful join
      },
      error: (err: any) => {
        console.error('Failed to join community:', err);
        alert('Failed to join community: ' + (err?.error || 'Unknown error'));
      }
    });
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}
