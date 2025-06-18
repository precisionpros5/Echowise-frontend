import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- Import FormsModule for standalone components
import { WebSocketService } from '../../services/websocket.service';

@Component({
    selector: 'app-message-input',
    standalone: true, // <--- THIS IS KEY FOR STANDALONE
    imports: [FormsModule], // <--- Add FormsModule here
    templateUrl: './message-input.component.html',
    styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
    @Input() currentUser: string = '';
    @Output() sendMessageEvent = new EventEmitter<string>();

    @Input() currentRoomId = '2'; // Example room ID

    currentUserId: number | null = null; // Store as a number
    // Retrieve from session storage
    isConnected = false;
    messageText: string = '';

    constructor(private webSocketService: WebSocketService) { }
    ngOnInit(): void {
        const userId = sessionStorage.getItem('userId');

        this.currentUserId = Number(userId);
        console.log('Current Room ID:message-input', this.currentRoomId); // Debugging log to check the roomId

        //throw new Error('Method not implemented.');
    }


    sendMessage(): void {
        if (this.currentUserId) {
            console.log('Sending message:', this.messageText); // Debugging log to check the message being sent
            this.webSocketService.sendMessage(this.currentRoomId, this.currentUserId, this.messageText);
            this.messageText = ''; // Clear the input field after sending
        }
        else {
            console.error('User ID is not set. Cannot send message.');
            alert('You must be logged in to send messages.');
        }
    }
}