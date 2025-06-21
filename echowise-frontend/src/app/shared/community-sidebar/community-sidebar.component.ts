import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';
import { WebSocketService } from '../../discussion/services/websocket.service'; // Assuming you have a WebSocketService

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, JoinComponent, CreateComponent],
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css'],

})
export class CommunitySidebarComponent implements OnInit {
  @Output() createDiscussionGroup = new EventEmitter<string>(); // Emit a string value
  @Output() questionsFetched = new EventEmitter<{ questions: any[]; communityCode: number }>(); // EventEmitter for questions
  // @Output() roomsFetched = new EventEmitter<any[]>(); // EventEmitter for rooms
  @Output() onCommunityclicked = new EventEmitter<any>(); // EventEmitter for community selection
  @Output() onAnswerclicked = new EventEmitter<any>(); // EventEmitter for answer selection   
  @Output() onDiscussionclicked = new EventEmitter<any>(); // EventEmitter for discussion room selection
  communities: any[] = []; // List of communities fetched from the backend
  selectedCommunity: any = null; // Selected community name
  isCreatePopupVisible = false;
  isJoinPopupVisible = false;
  roomsByCommunity: { [key: number]: any[] } = {}; // Map of communityId to rooms
  selectedRoom: any = null; // Selected room
  constructor(private authService: AuthService, private webSocketService: WebSocketService) {
    console.log('WebSocketService initialized:', !!this.webSocketService);
  }

  ngOnInit(): void {
    this.fetchCommunities();
  }

  fetchCommunities() {
    this.authService.getUserCommunities().subscribe({
      next: (response: any[]) => {
        this.communities = response; // Bind the fetched communities to the component
        if (this.communities.length > 0) {
          console.log('Fetched communities:', this.communities);
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
          this.selectedRoom = null
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
    this.selectedCommunity = community; // Update the selected community
    // Find the community by name

    //this.roomsFetched.emit(this.selectedRoom);
    this.onCommunityclicked.emit(community);
    this.fetchQuestionsByCommunity(community);// Emit the selected community
    this.fetchRoomsByCommunity(community); // Fetch rooms for the selected community

    this.selectedRoom = null// Set the selected room to the first room of the selected community
    console.log('Selected Room:', this.selectedRoom); // Fetch questions for the selected community
    //this.roomsFetched.emit(this.selectedRoom); // Emit the fetched rooms

  }
  openCreateDiscussionGroup(community: any) {
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
    console.log('WebSocketService:', this.webSocketService);

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

    // Emit the selected room to the parent component
    this.onDiscussionclicked.emit(room);
  }
}
