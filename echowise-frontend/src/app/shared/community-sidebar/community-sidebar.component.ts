import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Add FormsModule for ngModel
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css']
})
export class CommunitySidebarComponent {
  communities = ['Community 1', 'Community 2', 'Community 3']; // Mock data for communities
  selectedCommunity = '';

  @Output() communityJoined = new EventEmitter<string>();
  @Output() communityCreated = new EventEmitter<void>();

  joinCommunity() {
    this.communityJoined.emit(this.selectedCommunity); // Emit selected community
  }

  createCommunity() {
    this.communityCreated.emit(); // Emit create community event
  }
}
