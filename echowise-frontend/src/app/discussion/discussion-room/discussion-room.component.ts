import { Component } from '@angular/core';
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
  currentUser = 'methilesh1';

  currentRoomId = '3'; // Example room ID
  currentUserId = 2; // Example user ID
  isConnected = false;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
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
