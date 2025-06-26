import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css']
})
export class CommunityDetailComponent {
  @Input() name!: string;
  @Input() code!: number;
  @Input() description!: string;
  @Input() community!: any;
  @Input() createdUserId!: any;
  users: string[] = []; // Array to hold usernames of users in the community
  @Output() popupClosed = new EventEmitter<void>();
  @Output() communityUpdated = new EventEmitter<
    {
      communitycode: number,
      update: { name: string; description: string }
    }>();
  @Output() communityDeleted = new EventEmitter<number>();
  @Output() closePopup = new EventEmitter<void>(); // Emit event when popup is closed
  isEditMode = false; // Track whether the component is in edit mode
  updatedName!: string;
  updatedDescription!: string;
  currentUser = sessionStorage.getItem('userId'); // Get current user ID from session storage
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsersInCommunity(this.code).subscribe({
      next: (response: any[]) => {
        this.users = response.map(user => user.username);
      },
      error: (err: any) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }

  triggerClosePopup() {
    this.closePopup.emit(); // Notify parent component to close the popup
  }

  copyToClipboard() {
    console.log('Copying community code:', this.code);
    const communityCode = this.code.toString(); // Convert communityCode to string
    navigator.clipboard.writeText(communityCode).then(() => {
      alert('Community Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy Community Code:', err);
      alert('Failed to copy Community Code. Please try again.');
    });
  }


  enableEditMode(): void {
    this.isEditMode = true;
    this.updatedName = this.name; // Initialize with current name
    this.updatedDescription = this.description; // Initialize with current description
  }

  saveChanges(): void {
    if (this.updatedName.trim() && this.updatedDescription.trim()) {
      this.communityUpdated.emit({
        communitycode: this.code,
        update: {
          name: this.updatedName,
          description: this.updatedDescription
        }
      }
      );
      this.isEditMode = false; // Exit edit mode after saving
    } else {
      alert('Name and description cannot be empty.');
    }
  }

  deleteCommunity(): void {
    if (confirm('Are you sure you want to delete this community?')) {
      this.communityDeleted.emit(this.code);
    }
  }

}
