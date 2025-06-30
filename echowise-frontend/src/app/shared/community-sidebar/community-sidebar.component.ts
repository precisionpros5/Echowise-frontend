import { Component, EventEmitter, Output, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';
import { WebSocketService } from '../../discussion/services/websocket.service'; // Assuming you have a WebSocketService
import { CommunityDetailComponent } from '../../community/community-detail/community-detail.component';

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, JoinComponent, CreateComponent, CommunityDetailComponent],
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css'],

})
export class CommunitySidebarComponent implements OnInit {
  @Output() createDiscussionGroup = new EventEmitter<string>(); // Emit a string value
  @Output() questionsFetched = new EventEmitter<{ questions: any[]; communityCode: number }>(); // EventEmitter for questions
  @Output() onCommunityclicked = new EventEmitter<any>(); // EventEmitter for community selection
  @Output() onAnswerclicked = new EventEmitter<any>(); // EventEmitter for answer selection   
  @Output() onDiscussionclicked = new EventEmitter<any>();
  @Input() roomDeletedEvent: any = null; // EventEmitter for discussion room selection
  communities: any[] = []; // List of communities fetched from the backend
  selectedCommunity: any = null; // Selected community name
  isCreatePopupVisible = false;
  isJoinPopupVisible = false;
  roomsByCommunity: { [key: number]: any[] } = {}; // Map of communityId to rooms
  selectedRoom: any = null; // Selected room
  constructor(private authService: AuthService, private webSocketService: WebSocketService) {
    console.log('WebSocketService initialized:', !!this.webSocketService);
  }
  isCommunityDetailPopupVisible = false;
  communityDetail: any; // Store community details for the popup

  ngOnInit(): void {

    const savedCommunity = localStorage.getItem('selectedCommunity');
    const savedRoom = localStorage.getItem('selectedRoom');

    if (savedCommunity) {
      console.log('Saved community found:', savedCommunity);
      this.selectedCommunity = JSON.parse(savedCommunity);
      this.fetchRoomsByCommunity(this.selectedCommunity);
      this.fetchQuestionsByCommunity(this.selectedCommunity);
    }

    if (savedRoom) {
      this.selectedRoom = JSON.parse(savedRoom);
    }
    console.log('Selected Room:', this.selectedRoom, this.selectedCommunity);
    this.fetchCommunities();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roomDeletedEvent'] && changes['roomDeletedEvent'].currentValue) {
      const communityId = changes['roomDeletedEvent'].currentValue;
      console.log(`Room deleted event received for community sidebar ${communityId}. Refreshing rooms...`);
      this.fetchRoomsByCommunity({ code: communityId }); // Trigger room refresh
    }}
  fetchCommunities() {
    this.authService.getUserCommunities().subscribe({
      next: (response: any[]) => {
        this.communities = response; // Bind the fetched communities to the component
        if (!this.selectedCommunity && this.communities.length > 0) {
          console.log('Fetched communities:', this.communities);
          this.selectedCommunity = this.communities[0];
          //console.log("check", this.selectedCommunity) // Select the first community by default
          this.fetchRoomsByCommunity(this.selectedCommunity); // Fetch rooms for the first community
          this.fetchQuestionsByCommunity(this.selectedCommunity); // Fetch questions for the first community
        }
        else if (this.selectedCommunity) {
          // Restore rooms and questions for the saved community
          this.fetchRoomsByCommunity(this.selectedCommunity);
          this.fetchQuestionsByCommunity(this.selectedCommunity);
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
          console.log(`Questions fetched for community ${community.code}:`, questions);
          this.questionsFetched.emit({ questions, communityCode }); // Emit the fetched questions
        },
        error: (err: any) => {
          console.error(`Failed to fetch questions for community ${community.code}:`, err);
          alert(`Failed to fetch questions for community ${community.code}.`);
        }
      });
    }
  }



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
          console.log(`Rooms fetched for community ${community.code}:`, this.roomsByCommunity);

          const savedRoom = localStorage.getItem('selectedRoom');
          if (savedRoom) {
            const parsedRoom = JSON.parse(savedRoom);
            const matchingRoom = rooms.find((room) => room.id === parsedRoom.id);
            if (matchingRoom) {
              console.log('Restoring selected room from localStorage:', matchingRoom);
              this.selectedRoom = matchingRoom;
              console.log('Restored selected room:', this.selectedRoom);
            } else {
              this.selectedRoom = null; // Reset if the saved room is not found in the fetched rooms
            }
          } else {
            this.selectedRoom = null; // Reset if no saved room exists
          }
          //console.log(`Selected Room:`, this.selectedRoom);
          // this.roomsFetched.emit(this.selectedRoom); // Emit the fetched rooms
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
    if (this.selectedCommunity?.code === community.code) {
      console.log('Switching to question view for the same community:', community.name, this.roomsByCommunity);

      // Reset the selected room to null to clear the discussion room selection
      this.selectedRoom = null;
      this.onCommunityclicked.emit(community);

      // Fetch questions for the community
      //this.fetchQuestionsByCommunity(community);

      return; // Exit early since the community is already selected
    }
    this.selectedCommunity = community; // Update the selected community
    // Find the community by name

    //this.roomsFetched.emit(this.selectedRoom);
    this.onCommunityclicked.emit(community);
    this.fetchQuestionsByCommunity(community);// Emit the selected community
    this.fetchRoomsByCommunity(community); // Fetch rooms for the selected community

    this.selectedRoom = null// Set the selected room to the first room of the selected community
    console.log('Selected Room:comm', this.selectedRoom); // Fetch questions for the selected community
    //this.roomsFetched.emit(this.selectedRoom); // Emit the fetched rooms
    localStorage.setItem('selectedCommunity', JSON.stringify(community));
  }
  openCreateDiscussionGroup(community: any) {
    console.log('Opening create discussion group for community:', community);
    this.createDiscussionGroup.emit(community); // Convert communityCode to string
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
  selectDiscussion(room: any): void {
    //console.log('WebSocketService:', this.webSocketService);

    if (this.selectedRoom === room) {
      console.log('Already connected to this room:', room.name);
      return;
    }

    // Disconnect from the current room
    if (this.selectedRoom) {
      console.log('Disconnecting from room:', this.selectedRoom.name);
      this.webSocketService.disconnect();
    }

    // Connect to the new room
    this.selectedRoom = room;
    console.log('Connecting to new room:', room.name);
    this.webSocketService.connect(room.id);
    localStorage.setItem('selectedRoom', JSON.stringify(room));

    // Emit the selected room to the parent component
    this.onDiscussionclicked.emit(room);
  }
  handleCommunityCreated(): void {
    //console.log('Community created, refreshing list...');
    this.fetchCommunities(); // Refresh the list of communities
  }
  showCommunityDetailPopup(community: any) {
    console.log('Showing community detail popup for1:', community);

    this.authService.getCommunityDetails(community.code).subscribe({
      next: (response) => {
        console.log('Community details fetched successfully:', response);
        this.communityDetail = { ...response };
        console.log('Community details fetched successfully:', this.communityDetail) // Store the community details
        this.isCommunityDetailPopupVisible = true; // Show the popup
      },
      error: (err) => {
        console.error('Failed to fetch community details:', err);
        alert('Failed to fetch community details. Please try again.');
      }
    });
  }
  closeCommunityDetailPopup() {
    this.isCommunityDetailPopupVisible = false; // Hide the popup
  }
  updateCommunity(event: any): void {
    this.authService.updatecommunities(event.communitycode, event.update).subscribe({
      next: (response: string) => {

        console.log('Community details updated successfully:', response);
        alert('Community updated successfully!');
        this.communityDetail.name = event.update.name;
        this.communityDetail.description = event.update.description;
        localStorage.setItem('selectedCommunity', JSON.stringify(this.communityDetail));
        this.isCommunityDetailPopupVisible = false; // Hide the popup after updating
        this.fetchCommunities();
      },
      error: (err) => {
        console.error('Failed to update community details:', err);
        alert('Failed to update community details. Please try again.');
      }
    });
  }
  deleteCommunity(event: any): void {
    console.log('Deleting community with code:', event);
    this.authService.deletecommunities(event).subscribe({
      next: (response: string) => {

        console.log('Community details updated successfully:', response);
        alert('Community updated successfully!');

        this.isCommunityDetailPopupVisible = false; // Hide the popup after updating
        this.fetchCommunities();
      },
      error: (err) => {
        console.error('Failed to update community details:', err);
        alert('Failed to update community details. Please try again.');
      }
    });
  }
}
