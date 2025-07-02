import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from '../../shared/alert/alert.service'; // Import AlertService

@Component({
  selector: 'app-create-discussion-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-discussion-group.component.html',
  styleUrls: ['./create-discussion-group.component.css']
})
export class CreateDiscussionGroupComponent implements OnChanges {
  @Input() community: any;
  @Output() closePopup = new EventEmitter<void>();
  @Output() roomcreated = new EventEmitter<any>(); // Emit the community code when a room is created
  users: string[] = [];
  selectedUsers: string[] = [];
  currentUser: string | null = sessionStorage.getItem('username'); // Current user username
  groupName = '';
  groupDescription = '';

  constructor(private authService: AuthService, private alertService: AlertService) { } // Inject AlertService

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['community']) {
      this.fetchUsers();
    }
  }

  fetchUsers() {
    this.authService.getUserCommunities().subscribe({
      next: (communities: any[]) => {
        const community = communities.find(c => c.code === this.community.code);
        console.log('Fetched communities:', communities); // Debugging
        if (community && community.code) {
          const communityCode = community.code;
          this.authService.getUsersInCommunity(communityCode).subscribe({
            next: (response: any[]) => {
              this.users = response.map(user => user.username);
            },
            error: (err: any) => {
              console.error('Failed to fetch users:', err);
              this.alertService.showAlert('Failed to fetch users for the community.', 'error'); // Custom alert
            }
          });
        } else {
          console.error('Community not found:', this.community.name);
          this.alertService.showAlert('Community not found.', 'error'); // Custom alert
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch communities:', err);
        this.alertService.showAlert('Failed to fetch communities.', 'error'); // Custom alert
      }
    });
  }

  toggleUserSelection(user: string) {
    if (this.selectedUsers.includes(user)) {
      this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    } else {
      this.selectedUsers.push(user);
    }
  }

  createGroup() {
    if (!this.groupName || !this.groupDescription) {
      this.alertService.showAlert('Please provide both a group name and description.', 'error'); // Custom alert
      return;
    }

    const payload = {
      name: this.groupName,
      description: this.groupDescription,
      memberUsernames: [...this.selectedUsers, this.currentUser]
    };

    this.authService.createDiscussionRoom(this.community.code, payload).subscribe({
      next: (response: any) => {
        console.log('Discussion group created successfully:', response);
        this.alertService.showAlert('Discussion group created successfully!', 'success'); // Custom alert
        this.roomcreated.emit(this.community.code); // Emit event to notify parent component
        this.close();
      },
      error: (err: any) => {
        console.error('Failed to create discussion group:', err);
        this.alertService.showAlert('Failed to create discussion group.', 'error'); // Custom alert
      }
    });
  }

  close() {
    this.closePopup.emit();
  }
}

