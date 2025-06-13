import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  communityName = '';
  communityDescription = '';
  generatedCode = '';
  @Output() popupClosed = new EventEmitter<void>();

  generateCode() {
    this.generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createCommunity() {
    console.log('Creating community:', this.communityName, this.communityDescription, this.generatedCode);
    alert('Community created successfully!');
    this.popupClosed.emit(); // Emit event to close popup
  }

  closePopup() {
    this.popupClosed.emit(); // Emit event to close popup
  }
}