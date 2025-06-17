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
  @Output() questionsFetched = new EventEmitter<any[]>(); // EventEmitter for questions

  communities: any[] = []; // List of communities fetched from the backend
  selectedCommunity: any = null; // Selected community name
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
        if (this.communities.length > 0) {
          this.selectedCommunity = this.communities[0];
          //console.log("check", this.selectedCommunity) // Select the first community by default
          this.fetchRoomsByCommunity(this.selectedCommunity); // Fetch rooms for the first community
          this.fetchQuestionsByCommunity(this.selectedCommunity); // Fetch questions for the first community
        }
        //this.fetchRoomsForAllCommunities(); // Start fetching rooms for each community
      },
      error: (err: any) => {
        console.error('Failed to fetch communities:', err);
        alert('Failed to fetch communities.');
      }
    });
  }

  fetchQuestionsByCommunity(community: any) {
    if (community && community.code) {
      const communityCode = community.code; // Extract the community code
      //console.log(`Fetching rooms for community code: ${communityCode}`);
      this.authService.getQuestionsByCommunity(community.code).subscribe({
        next: (questions: any[]) => {
          this.questionsFetched.emit(questions); // Emit the fetched questions
        },
        error: (err: any) => {
          console.error(`Failed to fetch questions for community ${community.code}:`, err);
          alert(`Failed to fetch questions for community ${community.code}.`);
        }
      });
    }
  }

  // fetchRoomsForAllCommunities() {
  //   // Iterate through each community and fetch its rooms
  //   for (const community of this.communities) {
  //     this.fetchRoomsByCommunity(community);
  //   }
  // }

  fetchRoomsByCommunity(community: any) {
    //console.log('Fetching rooms for community:', community);
    if (community && community.code) {
      const communityCode = community.code; // Extract the community code
      //console.log(`Fetching rooms for community code: ${communityCode}`);

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

  selectCommunity(community: any) {
    this.selectedCommunity = community; // Update the selected community
    // Find the community by name

    this.fetchRoomsByCommunity(community); // Fetch rooms for the selected community
    this.fetchQuestionsByCommunity(community); // Fetch questions for the selected community
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
