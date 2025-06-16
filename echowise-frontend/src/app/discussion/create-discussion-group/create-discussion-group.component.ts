import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-discussion-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-discussion-group.component.html',
  styleUrls: ['./create-discussion-group.component.css']
})
export class CreateDiscussionGroupComponent implements OnChanges {
  @Input() communityName!: string; // Input for the community name
  @Output() closePopup = new EventEmitter<void>(); // Event emitter for closing the popup
  users: string[] = []; // List of usernames fetched from the backend
  selectedUsers: string[] = []; // List of selected usernames
  groupName = ''; // Name of the discussion group
  groupDescription = ''; // Description of the discussion group

  constructor(private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['communityName'] && this.communityName) {
      this.fetchUsers();
    }
  }

  fetchUsers() {
    this.authService.getUserCommunities().subscribe({
      next: (communities: any[]) => {
        const community = communities.find(c => c.name === this.communityName);
        if (community && community.code) {
          const communityCode = community.code;
          this.authService.getUsersInCommunity(communityCode).subscribe({
            next: (response: any[]) => {
              this.users = response.map(user => user.username);
            },
            error: (err: any) => {
              console.error('Failed to fetch users:', err);
              alert('Failed to fetch users for the community.');
            }
          });
        } else {
          console.error('Community not found:', this.communityName);
          alert('Community not found.');
        }
      },
      error: (err: any) => {
        console.error('Failed to fetch communities:', err);
        alert('Failed to fetch communities.');
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
      alert('Please provide both a group name and description.');
      return;
    }

    const payload = {
      name: this.groupName,
      description: this.groupDescription,
      memberUsernames: this.selectedUsers
    };

    this.authService.createDiscussionRoom(this.communityName, payload).subscribe({
      next: (response: any) => {
        console.log('Discussion group created successfully:', response);
        alert('Discussion group created successfully!');
        this.close(); // Close the popup after successful creation
      },
      error: (err: any) => {
        console.error('Failed to create discussion group:', err);
        alert('Failed to create discussion group.');
      }
    });
  }

  close() {
    this.closePopup.emit(); // Emit the closePopup event
  }
}
