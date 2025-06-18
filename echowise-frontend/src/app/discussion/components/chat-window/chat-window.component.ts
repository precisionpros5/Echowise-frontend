import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Import CommonModule for standalone components
import { ChatService, Message } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

@Component({
    selector: 'app-chat-window',
    standalone: true, // <--- THIS IS KEY FOR STANDALONE
    imports: [CommonModule], // <--- Add CommonModule here
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
    @Input() currentUser: string = '';
    @Input() currentRoomId: string | null = null; // Example room ID, can be passed from parent component
    messages: Message[] = [];
    private messageSubscription!: Subscription;
    private messageHistorySubscription!: Subscription;
    newMessage: string = '';

    constructor(private chatService: ChatService, private webSocketService: WebSocketService) { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['currentRoomId'] && changes['currentRoomId'].currentValue !== changes['currentRoomId'].previousValue) {
            const newRoomId = changes['currentRoomId'].currentValue;
            console.log('Room ID changed:', newRoomId);

            // Clear existing messages
            this.messages = [];

            // Fetch new message history for the updated room ID
            if (newRoomId) {
                this.chatService.fetchMessages(newRoomId);
                //this.subscribeToMessageHistory(newRoomId);
            }
        }
    }

    ngOnInit(): void {
        const roomId = this.currentRoomId; // Hardcoded roomId for now
        console.log('Current Room ID:fromchatwindow', roomId); // Debugging log to check the roomId
        // Fetch messages for the specified roomId
        if (roomId) {
            this.chatService.fetchMessages(roomId);
        }

        // Subscribe to message history updates
        this.messageHistorySubscription = this.chatService.getMessageHistory().subscribe(history => {
            console.log('Received message history:', history); // Debugging log
            this.messages.push(...history); // Append history to existing messages
            this.scrollToBottom();
        });

        // Subscribe to new incoming messages
        this.messageSubscription = this.webSocketService.getMessages().subscribe((messages) => {
            console.log('Updated messages:', messages);
            messages.forEach((msg: Message) => {
                this.messages.push(msg); // Append each new message to the array
            });
            //this.scrollToBottom();
        });
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    ngOnDestroy(): void {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.messageHistorySubscription) {
            this.messageHistorySubscription.unsubscribe();
        }
    }

    // private scrollToBottom(): void {
    //     const container = document.getElementById('messages-container');
    //     if (container) {
    //         container.scrollTop = container.scrollHeight;
    //     }
    // }
    private scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scroll({
                top: this.myScrollContainer.nativeElement.scrollHeight,
                behavior: 'smooth'
            });
        }
        catch (err) {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
    }
}