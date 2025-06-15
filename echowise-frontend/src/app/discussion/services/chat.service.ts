import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs'; // Removed 'interval', 'take' as no longer needed

export interface Message {
    user: string;
    text: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    // --- Simulating backend communication with RxJS Subjects ---
    // These Subjects will now be primarily fed by your WebSocket connection
    private messagesSubject = new Subject<Message>();
    private messageHistorySubject = new Subject<Message[]>();
    private usersInRoomSubject = new BehaviorSubject<string[]>([]);

    // In-memory storage for messages and users (will reset on browser refresh)
    // This will primarily be populated by actual backend data
    private allMessages: Message[] = [];
    private currentUsers = new Set<string>();

    constructor() {
        // --- Initial Placeholder Messages (Demo Purposes Only) ---
        // These messages will appear when the service is first initialized.
        this.allMessages.push(
            {
                user: 'Admin',
                text: 'Welcome to the discussion room! Waiting for backend connection...',
                timestamp: new Date().toISOString()
            },
            {
                user: 'System',
                text: 'This is a demo message. Real-time messages will appear here via WebSockets.',
                timestamp: new Date().toISOString()
            }
        );

        // Initialize user list with a default (e.g., 'You' or 'Guest')
        // This will be updated by your backend 'users in room' events
        this.currentUsers.add('You');
        this.usersInRoomSubject.next(Array.from(this.currentUsers));

        // Emit initial history once the service is constructed
        // Components can subscribe to get these placeholders immediately
        this.messageHistorySubject.next(this.allMessages);

        // --- WebSocket Integration Point (Future ToDo) ---
        // This is where you would typically set up your WebSocket connection
        // and subscribe to incoming messages/events from your backend.
        // Example (pseudo-code):
        // this.websocketService.connect().subscribe(event => {
        //   if (event.type === 'message') {
        //     const receivedMessage: Message = { user: event.user, text: event.text, timestamp: event.timestamp };
        //     this.allMessages.push(receivedMessage);
        //     this.messagesSubject.next(receivedMessage); // Emit to all UI subscribers
        //   } else if (event.type === 'user_joined' || event.type === 'user_left') {
        //     // Update this.currentUsers and then call this.usersInRoomSubject.next()
        //   }
        // });
    }

    // --- Public methods for components to interact with ---

    // For joining a room, you'll likely send a message to your WebSocket backend.
    // The backend will then respond, updating the user list and message history.
    joinRoom(username: string) {
        if (!this.currentUsers.has(username)) {
            this.currentUsers.add(username); // Add locally for immediate UI update
            this.usersInRoomSubject.next(Array.from(this.currentUsers));
            console.log(`[Frontend] Attempting to join as ${username}.`);

            // TODO: Send a 'join_room' message to your WebSocket backend here
            // Your backend will then respond with the full message history and user list
            // which you'll use to update messageHistorySubject and usersInRoomSubject.

            // For now, just send existing history to the client that just 'joined'
            this.messageHistorySubject.next(this.allMessages);
        } else {
            // If user already exists, just send history
            this.messageHistorySubject.next(this.allMessages);
        }
    }

    // For sending messages, you'll send them via your WebSocket backend.
    // The message will then be echoed back from the server to all clients (including sender).
    sendMessage(messageText: string, username: string) {
        const tempMessage: Message = { // Create a temporary message
            user: username,
            text: messageText,
            timestamp: new Date().toISOString()
        };
        // For a real backend, you'd send this via WebSocket:
        // this.websocketService.send({ type: 'chat_message', content: messageText, sender: username });

        // For now, just simulate adding it immediately (this won't happen with real backend)
        this.allMessages.push(tempMessage);
        this.messagesSubject.next(tempMessage); // Emit to all subscribers
        console.log(`[Frontend] Sending message from ${username}: ${messageText}`);
    }

    getMessages(): Observable<Message> {
        return this.messagesSubject.asObservable();
    }

    getMessageHistory(): Observable<Message[]> {
        return this.messageHistorySubject.asObservable();
    }

    getUsersInRoom(): Observable<string[]> {
        return this.usersInRoomSubject.asObservable();
    }

    // Removed private simulateUserActivity() method as it's no longer needed.
}