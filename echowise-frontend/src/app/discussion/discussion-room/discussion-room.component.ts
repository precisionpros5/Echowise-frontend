import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../components/user-list/user-list.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { MessageInputComponent } from '../components/message-input/message-input.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-discussion-room',
  standalone: true,
  imports: [CommonModule, UserListComponent, ChatWindowComponent, MessageInputComponent, RouterModule],
  templateUrl: './discussion-room.component.html',
  styleUrls: ['./discussion-room.component.css']
})
export class DiscussionRoomComponent {
  title = 'Discussion Room';
  currentUser = 'User123';

  handleSendMessage(event: any): void {
    console.log('Message sent:', event);
    // Add your message handling logic here
  }
}
