import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <--- Import FormsModule for standalone components

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

    messageText: string = '';

    constructor() { }

    sendMessage(): void {
        if (this.messageText.trim()) {
            this.sendMessageEvent.emit(this.messageText);
            this.messageText = '';
        }
    }
}