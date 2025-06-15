import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Import CommonModule for standalone components
import { ChatService, Message } from '../../services/chat.service';
import { Subscription } from 'rxjs';

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

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
        this.messageHistorySubscription = this.chatService.getMessageHistory().subscribe(history => {
            console.log('Received message history:', history); // Debugging log
            this.messages = [...history];
            this.scrollToBottom();
        });

        this.messageSubscription = this.chatService.getMessages().subscribe(message => {
            this.messages.push(message);
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

    private scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            // console.error('Scroll to bottom failed:', err); // Keep this commented unless debugging
        }
    }
}