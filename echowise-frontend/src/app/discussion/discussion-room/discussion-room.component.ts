import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { MessageInputComponent } from '../components/message-input/message-input.component';
import { RouterModule } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateRoomDialogComponent } from '../../room-actions/update-room-dialog/update-room-dialog.component';
import { RoomService } from '../../discussion/services/room.service';
import { AddMembersDialogComponent } from '../../room-actions/add-members-dialog/add-members-dialog.component';
import { ExistingUsersDialogComponent } from '../../room-actions/existing-users-dialog/existing-users-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-discussion-room',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatWindowComponent, MessageInputComponent, RouterModule, MatDialogModule, MatMenuModule, MatIconModule, MatButtonModule],
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css']
})
export class DiscussionRoomComponent {
  title = 'Discussion Room';
  @Input() currentUser: string = "";
  @Input() currentRoom: any; // Example room details
  @Input() currentRoomId: any = '2'; // Example room ID
  currentUserId: string | null = null; // Retrieve from session storage
  isConnected = false;
  isEditPopupVisible: boolean = false; // Control popup visibility
  updatedRoomName: string = ''; // Store updated room name

  constructor(private webSocketService: WebSocketService, private authService: AuthService, private dialog: MatDialog, private roomService: RoomService) { }

  ngOnInit(): void {
    this.currentUserId = sessionStorage.getItem('userId');
    this.currentUser = sessionStorage.getItem('username') ?? '';
    console.log('Current User:', this.currentUser); // Debugging log to check the current user
    console.log('Current Room ID:discussionroom', this.currentRoomId); // Debugging log to check the roomId

    this.webSocketService.getConnectionStatus().subscribe((status) => {
      this.isConnected = status;
    });
    const roomId = this.currentRoomId; // Use the currentRoomId from the component
    this.webSocketService.connect(roomId);
  }

  connect(): void {
    this.webSocketService.connect(this.currentRoomId);
  }

  disconnect(): void {
    this.webSocketService.disconnect();
  }

  handleSendMessage(event: any): void {
    console.log('Message sent:', event);
    // Add your message handling logic here
  }

  editDetails(): void {
    this.updatedRoomName = this.currentRoom.name; // Initialize with current room name
    this.isEditPopupVisible = true; // Show the popup
  }

  saveRoomDetails(): void {
    if (!this.updatedRoomName.trim()) {
      alert('Room name cannot be empty.');
      return;
    }

    const name = this.updatedRoomName; // Pass the name directly as a string

    this.authService.editRoomDetails(this.currentRoom.id, name).subscribe({
      next: (response: any) => {
        console.log('Room details updated successfully:', response);
        this.currentRoom.name = response.name; // Update the local room name
        this.currentRoom.communityId = response.communityId; // Update communityId
        this.currentRoom.isPrivate = response.isPrivate; // Update privacy status
        this.isEditPopupVisible = false; // Hide the popup

        // updating local storage with updated room details
        localStorage.setItem('selectedRoom', JSON.stringify(this.currentRoom));
        alert('Room details updated successfully!');
      },
      error: (err: any) => {
        console.error('Failed to update room details:', err);
        alert('Failed to update room details. Please try again.');
      }
    });
  }

  closeEditPopup(): void {
    this.isEditPopupVisible = false; // Hide the popup
  }


  viewRoomDetails(): void {
    this.roomService.getRoomById(this.currentRoomId).subscribe(room => {
      alert(`Room Name: ${room.name}\nDescription: ${room.description}`);
    });
  }

  openUpdateRoomDialog(): void {
    const dialogRef = this.dialog.open(UpdateRoomDialogComponent, {
      width: '400px',
      data: { roomId: this.currentRoomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Room updated successfully');
      }
    });
  }

  confirmDeleteRoom(): void {
    const confirmed = confirm('Are you sure you want to delete this room?');
    if (confirmed) {
      this.roomService.deleteRoom(this.currentRoomId).subscribe(() => {
        alert('Room deleted successfully');
        // Optionally navigate away or refresh
      });
    }
  }

  openAddMembersDialog(): void {
    this.dialog.open(AddMembersDialogComponent, {
      width: '400px',
      data: { roomId: this.currentRoomId }
    });
  }

  viewExistingUsers(): void {
    this.dialog.open(ExistingUsersDialogComponent, {
      width: '400px',
      data: { roomId: this.currentRoomId }
    });
  }
}


