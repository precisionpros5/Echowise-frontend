import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, JoinComponent, CreateComponent],
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css']
})
export class CommunitySidebarComponent {
  communities = [
    {
      name: 'Community 1',
      discussionGroups: ['Discussion 1', 'Discussion 2']
    },
    {
      name: 'Community 2',
      discussionGroups: []
    }
  ];

  selectedCommunity = '';
  @Output() createDiscussionGroup = new EventEmitter<string>();

  isJoinPopupVisible = false;
  isCreatePopupVisible = false;

  selectCommunity(community: string) {
    this.selectedCommunity = community;
  }

  openCreateDiscussionGroup(community: string) {
    this.createDiscussionGroup.emit(community); // Emit the event with the community name
  }

  showJoinPopup() {
    this.isJoinPopupVisible = true;
  }

  closeJoinPopup() {
    this.isJoinPopupVisible = false;
  }

  showCreatePopup() {
    this.isCreatePopupVisible = true;
  }

  closeCreatePopup() {
    this.isCreatePopupVisible = false;
  }
}
