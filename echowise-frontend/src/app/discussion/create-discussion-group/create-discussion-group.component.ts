import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-discussion-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-discussion-group.component.html',
  styleUrls: ['./create-discussion-group.component.css']
})
export class CreateDiscussionGroupComponent {
  @Input() communityName!: string;
  @Input() users!: string[];
  @Output() groupCreated = new EventEmitter<{ groupName: string; selectedUsers: string[] }>();
  @Output() closePopup = new EventEmitter<void>();

  groupName = '';
  selectedUsers: string[] = [];

  toggleUserSelection(user: string) {
    if (this.selectedUsers.includes(user)) {
      this.selectedUsers = this.selectedUsers.filter(u => u !== user);
    } else {
      this.selectedUsers.push(user);
    }
  }

  createGroup() {
    this.groupCreated.emit({ groupName: this.groupName, selectedUsers: this.selectedUsers });
  }

  close() {
    this.closePopup.emit();
  }
}
