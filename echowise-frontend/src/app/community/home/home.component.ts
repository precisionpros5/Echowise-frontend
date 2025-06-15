import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommunitySidebarComponent } from '../../shared/community-sidebar/community-sidebar.component';
import { CreateDiscussionGroupComponent } from '../../discussion/create-discussion-group/create-discussion-group.component';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ListComponent } from '../../question/list/list.component';
import { PostComponent } from '../../question/post/post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Include FormsModule for ngModel
    NavbarComponent,
    CommunitySidebarComponent,
    CreateDiscussionGroupComponent,
    ListComponent,
    JoinComponent,
    CreateComponent,
    FooterComponent,
    PostComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isJoinPopupVisible = false;
  isCreatePopupVisible = false;
  isCreateDiscussionGroupVisible = false;
  selectedCommunityName = '';
  communityCode = ''; // Add communityCode property
  users = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5']; // Example users

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

  openCreateDiscussionGroup(communityName: string) {
    this.selectedCommunityName = communityName;
    this.isCreateDiscussionGroupVisible = true;
  }

  closeCreateDiscussionGroup() {
    this.isCreateDiscussionGroupVisible = false;
  }

  joinCommunity() {
    console.log('Joining community with code:', this.communityCode);
    alert('Joined community successfully!');
    this.closeJoinPopup();
  }

  handleGroupCreated(groupData: { groupName: string; selectedUsers: string[] }) {
    console.log('Group Created:', groupData);
    this.isCreateDiscussionGroupVisible = false;
  }
}
