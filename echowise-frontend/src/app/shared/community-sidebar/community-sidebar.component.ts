import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';

@Component({
  selector: 'app-community-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, JoinComponent, CreateComponent],
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css']
})
export class CommunitySidebarComponent implements OnInit {
  @Output() createDiscussionGroup = new EventEmitter<string>(); // Emit a string value

  communities: any[] = []; // List of communities fetched from the backend
  selectedCommunity: string = '';
  isCreatePopupVisible = false;
  isJoinPopupVisible = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchCommunities();
  }

  fetchCommunities() {
    this.authService.getUserCommunities().subscribe({
      next: (response: any[]) => {
        this.communities = response; // Bind the fetched communities to the component
      },
      error: (err: any) => {
        console.error('Failed to fetch communities:', err);
        alert('Failed to fetch communities.');
      }
    });
  }

  selectCommunity(community: string) {
    this.selectedCommunity = community;
  }

  openCreateDiscussionGroup(community: string) {
    this.createDiscussionGroup.emit(community); // Emit the community name
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
