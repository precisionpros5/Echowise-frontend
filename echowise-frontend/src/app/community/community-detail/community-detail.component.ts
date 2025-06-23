import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css']
})
export class CommunityDetailComponent {
  @Input() name!: string;
  @Input() code!: number;
  @Input() description!: string;
  users: string[] = []; // Array to hold usernames of users in the community

  @Output() closePopup = new EventEmitter<void>(); // Emit event when popup is closed

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsersInCommunity(this.code).subscribe({
      next: (response: any[]) => {
        this.users = response.map(user => user.username);
      },
      error: (err: any) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }

  triggerClosePopup() {
    this.closePopup.emit(); // Notify parent component to close the popup
  }

  copyToClipboard() {
    const communityCode = this.code.toString(); // Convert communityCode to string
    navigator.clipboard.writeText(communityCode).then(() => {
      alert('Community Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy Community Code:', err);
      alert('Failed to copy Community Code. Please try again.');
    });
  }
}
