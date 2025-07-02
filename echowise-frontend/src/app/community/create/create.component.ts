import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../shared/alert/alert.service'; // Import AlertService

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
  @Output() communityCreated = new EventEmitter<void>();

  constructor(private authService: AuthService, private alertService: AlertService) { } // Inject AlertService

  createCommunity() {
    // Validate Community Name
    console.log('Creating community with name:', this.communityName, 'and description:', this.communityDescription); // Debugging log
    if (!this.communityName.trim()) {
      this.alertService.showAlert('Community Name is required.', 'error'); // Use AlertService
      return;
    }
    if (this.communityName.length < 3 || this.communityName.length > 16) {
      this.alertService.showAlert('Community Name must be between 3 and 15 characters.', 'error'); // Use AlertService
      return;
    }

    // Validate Community Description
    if (!this.communityDescription.trim()) {
      this.alertService.showAlert('Community Description is required.', 'error'); // Use AlertService
      return;
    }
    if (this.communityDescription.length < 10 || this.communityDescription.length > 200) {
      this.alertService.showAlert('Community Description must be between 10 and 200 characters.', 'error'); // Use AlertService
      return;
    }

    const request = {
      name: this.communityName.trim(),
      description: this.communityDescription.trim()
    };

    this.authService.createCommunity(request).subscribe({
      next: (response: any) => {
        this.generatedCode = response.code; // Display the generated code from the backend response
        this.alertService.showAlert('Community created successfully! Community code: ' + this.generatedCode, 'success'); // Use AlertService
        this.communityCreated.emit();
        this.closePopup(); // Close the popup after successful creation
      },
      error: (err: any) => {
        this.alertService.showAlert('Failed to create community: ' + (err.error?.message || 'Unknown error'), 'error'); // Use AlertService
      }
    });
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}