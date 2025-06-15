import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- Import CommonModule for standalone components
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-list',
    standalone: true, // <--- THIS IS KEY FOR STANDALONE
    imports: [CommonModule], // <--- Add CommonModule here
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
    users: string[] = [];
    private userListSubscription!: Subscription;

    constructor(private chatService: ChatService) { }

    ngOnInit(): void {
        this.userListSubscription = this.chatService.getUsersInRoom().subscribe(users => {
            this.users = users.sort();
        });
    }

    ngOnDestroy(): void {
        if (this.userListSubscription) {
            this.userListSubscription.unsubscribe();
        }
    }
}