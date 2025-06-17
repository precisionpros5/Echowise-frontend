import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, Input } from '@angular/core';
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
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
    @Input() currentUser: string = '';

    messages: Message[] = [];
    private messageSubscription!: Subscription;
    private messageHistorySubscription!: Subscription;
    newMessage: string = '';

    constructor(private chatService: ChatService, private webSocketService: WebSocketService) { }

    ngOnInit(): void {
        const roomId = '2'; // Hardcoded roomId for now

        // Fetch messages for the specified roomId
        this.chatService.fetchMessages(roomId);

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
            this.scrollToBottom();
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