import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, JoinComponent, CreateComponent],
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css']
})
export class CommunitySidebarComponent implements OnInit {
  @Output() createDiscussionGroup = new EventEmitter<string>(); // Emit a string value

  communities: any[] = []; // List of communities fetched from the backend
  selectedCommunity: string = '';
  isCreatePopupVisible = false;
  isJoinPopupVisible = false;
  roomsByCommunity: { [key: number]: any[] } = {}; // Map of communityId to rooms

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchCommunities();
  }

  fetchCommunities() {
    this.authService.getUserCommunities().subscribe({
      next: (response: any[]) => {
        this.communities = response; // Bind the fetched communities to the component
        this.fetchRoomsForAllCommunities(); // Start fetching rooms for each community
      },
      error: (err: any) => {
        console.error('Failed to fetch communities:', err);
        alert('Failed to fetch communities.');
      }
    });
  }

  fetchRoomsForAllCommunities() {
    // Iterate through each community and fetch its rooms
    for (const community of this.communities) {
      this.fetchRoomsByCommunity(community);
    }
  }

  fetchRoomsByCommunity(community: any) {
    if (community && community.code) {
      const communityCode = community.code; // Extract the community code
      console.log(`Fetching rooms for community code: ${communityCode}`);

      // Fetch rooms using the extracted community code
      this.authService.getRoomsByCommunity(communityCode).subscribe({
        next: (rooms: any[]) => {
          // Ensure rooms are mapped to the correct community ID
          this.roomsByCommunity[community.code] = rooms;
          console.log(`Rooms fetched for community ${community.code}:`, rooms);
          console.log(`Rooms by community:`, this.roomsByCommunity);
        },
        error: (err: any) => {
          console.error(`Failed to fetch rooms for community ${community.id}:`, err);
          alert(`Failed to fetch rooms for community ${community.id}.`);
        }
      });
    } else {
      console.error('Community not found or missing code:', community);
      alert('Community not found or missing code.');
    }
  }

  selectCommunity(community: string) {
    this.selectedCommunity = community;
  }

  openCreateDiscussionGroup(community: string) {
    this.createDiscussionGroup.emit(community); // Emit the community name
  }

  showJoinPopup() {
    this.isJoinPopupVisible = true;
  }

  closeJoinPopup() {
    this.isJoinPopupVisible = false;
  }

  showCreatePopup() {
    this.isCreatePopupVisible = true;
  }

  closeCreatePopup() {
    this.isCreatePopupVisible = false;
  }
}
