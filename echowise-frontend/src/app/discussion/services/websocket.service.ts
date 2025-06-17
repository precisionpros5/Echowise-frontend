import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private stompClient: Stomp.Client | null = null;
    private connectedSubject = new BehaviorSubject<boolean>(false);
    private messagesSubject = new BehaviorSubject<any[]>([]);

    private backendUrl = 'http://localhost:8085/ws'; // WebSocket backend URL
    private currentRoomId: string | null = null;

    connect(roomId: string): void {
        if (this.stompClient && this.stompClient.connected) {
            console.log('Already connected.');
            if (this.currentRoomId !== roomId) {
                this.switchRoom(roomId);
            }
            return;
        }

        const socket = new SockJS(this.backendUrl);
        console.log('SockJS socket created:', socket);

        this.stompClient = new Stomp.Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000, // Automatically reconnect after 5 seconds
            heartbeatIncoming: 4000, // Heartbeat interval for incoming messages
            heartbeatOutgoing: 4000, // Heartbeat interval for outgoing messages
        });

        this.stompClient.onConnect = () => {
            console.log('Connected to WebSocket');
            this.connectedSubject.next(true);
            this.currentRoomId = roomId;
            this.subscribeToRoom(roomId);
        };

        this.stompClient.onStompError = (error: any) => {
            console.error('STOMP error:', error);
            this.connectedSubject.next(false);
        };

        this.stompClient.activate(); // Activate the STOMP client
    }

    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.onDisconnect = (frame: Stomp.IFrame) => {
                console.log('Disconnected from WebSocket:', frame);
                this.connectedSubject.next(false);
                this.currentRoomId = null;
            };
        }
    }

    sendMessage(roomId: string, userId: number, content: string): void {
        this.connect(roomId); // Ensure connection before sending message
        if (!this.stompClient || !this.stompClient.connected) {
            console.error('Not connected to WebSocket');
            return;
        }

        const message = {
            userId,
            roomId: parseInt(roomId, 10),
            content
        };

        this.stompClient.publish({
            destination: '/app/chat.sendMessage',
            body: JSON.stringify(message)
        });
        console.log('Message sent:', message);
    }

    subscribeToRoom(roomId: string): void {
        if (!this.stompClient) {
            console.error('WebSocket client not initialized');
            return;
        }

        this.stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
            const parsedMessage = JSON.parse(message.body);
            console.log('Received message:', parsedMessage);
            this.messagesSubject.next([...this.messagesSubject.value, parsedMessage]);
        });
    }

    switchRoom(roomId: string): void {
        if (this.stompClient && this.currentRoomId) {
            this.stompClient.unsubscribe(`/topic/room/${this.currentRoomId}`);
            this.messagesSubject.next([]); // Clear messages for the new room
            this.currentRoomId = roomId;
            this.subscribeToRoom(roomId);
        }
    }

    getConnectionStatus(): Observable<boolean> {
        return this.connectedSubject.asObservable();
    }

    getMessages(): Observable<any[]> {
        return this.messagesSubject.asObservable();
    }
}