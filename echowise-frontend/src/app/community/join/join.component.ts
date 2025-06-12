import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  communityCode = '';
  @Output() popupClosed = new EventEmitter<void>();

  joinCommunity() {
    console.log('Joining community with code:', this.communityCode);
    alert('Joined community successfully!');
    this.popupClosed.emit(); // Emit event to close popup
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}
