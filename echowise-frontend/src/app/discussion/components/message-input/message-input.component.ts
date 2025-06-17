import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- Import FormsModule for standalone components
import { WebSocketService } from '../../services/websocket.service';

@Component({
    selector: 'app-message-input',
    standalone: true, // <--- THIS IS KEY FOR STANDALONE
    imports: [FormsModule], // <--- Add FormsModule here
    templateUrl: './message-input.component.html',
    styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
    @Input() currentUser: string = '';
    @Output() sendMessageEvent = new EventEmitter<string>();

    currentRoomId = '2'; // Example room ID
    currentUserId = 2; // Example user ID
    isConnected = false;
    messageText: string = '';

    constructor(private webSocketService: WebSocketService) { }

    
    sendMessage(): void {
        this.webSocketService.sendMessage(this.currentRoomId, this.currentUserId, this.messageText);
        this.messageText = ''; // Clear the input field after sending
    }
    
}