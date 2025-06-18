import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../components/user-list/user-list.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { MessageInputComponent } from '../components/message-input/message-input.component';
import { RouterModule } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-discussion-room',
  standalone: true,
  imports: [CommonModule, UserListComponent, ChatWindowComponent, MessageInputComponent, RouterModule],
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css']
})
export class DiscussionRoomComponent {
  title = 'Discussion Room';
  @Input() currentUser: string = "";

  @Input() currentRoomId: any = '2'; // Example room ID
  currentUserId: string | null = null; // Retrieve from session storage
  isConnected = false;

  constructor(private webSocketService: WebSocketService) { }

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
}
