import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { WebSocketService } from '../../discussion/services/websocket.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommunitySidebarComponent } from '../../shared/community-sidebar/community-sidebar.component';
import { CreateDiscussionGroupComponent } from '../../discussion/create-discussion-group/create-discussion-group.component';
import { JoinComponent } from '../../community/join/join.component';
import { CreateComponent } from '../../community/create/create.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ListComponent } from '../../question/list/list.component';
import { PostComponent } from '../../question/post/post.component';
import { AnswersComponent } from '../../answers/answers.component';
import { DiscussionRoomComponent } from '../../discussion/discussion-room/discussion-room.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Include FormsModule for ngModel
    RouterModule,
    NavbarComponent,
    CommunitySidebarComponent,
    CreateDiscussionGroupComponent,
    ListComponent,
    JoinComponent,
    CreateComponent,
    FooterComponent,
    PostComponent,
    AnswersComponent,
    DiscussionRoomComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isJoinPopupVisible = false;
  isCreatePopupVisible = false;
  isCreateDiscussionGroupVisible = false;
  selectedCommunity: any = null;
  communityCode = ''; // Add communityCode property
  isPostPopupVisible = false; // Control visibility of the Post popup
  questions: any[] = []; // Store the questions received from the sidebar
  questionId: string | null = null;
  discussionRoom: any = null; // Store the selected discussion room ID
  currentView: 'list' | 'answers' | 'discussionRoom' | null | string = 'list'; // Track the current view
  selectedCommunityCode: number | null = null; // Store the community code

  question: any = null;

  ngOnInit(): void {
    // Load saved state from localStorage
    const savedCommunity = localStorage.getItem('selectedCommunity');
    const savedView = localStorage.getItem('currentView');
    const savedQuestion = localStorage.getItem('question');
    const savedDiscussionRoom = localStorage.getItem('selectedRoom');

    if (savedCommunity) {
      this.selectedCommunity = JSON.parse(savedCommunity);
      this.selectedCommunityCode = this.selectedCommunity?.code || null;
    }

    if (savedView) {
      this.currentView = savedView;
    }

    if (savedQuestion) {
      this.question = JSON.parse(savedQuestion);
      this.questionId = this.question?.questionId || null;
    }

    if (savedDiscussionRoom) {
      this.discussionRoom = JSON.parse(savedDiscussionRoom);
    }
  }

  showPostPopup() {
    this.isPostPopupVisible = true; // Show the Post popup
  }

  closePostPopup() {
    this.isPostPopupVisible = false; // Hide the Post popup
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

  openCreateDiscussionGroup(community: any) {
    this.selectedCommunity = community;
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

  onQuestionsFetched(event: { questions: any[], communityCode: number }): void {
    console.log('Questions fetched @ HomeComponent:', event.questions);
    console.log('Community code @ HomeComponent:', event.communityCode);
    this.questions = event.questions; // Update the questions array
    this.selectedCommunityCode = event.communityCode; // Update the selected community code
  }

  handleCommunitySelected(community: any): void {
    this.selectedCommunity = community;
    this.selectedCommunityCode = community.code;
    this.currentView = 'list'; // Switch to question list view

    // Save selection to localStorage
    // localStorage.setItem('selectedCommunity', JSON.stringify(community));
    localStorage.setItem('currentView', 'list');
    console.log('Community selected:', community);
  }

  // Handle when a question is clicked
  handleItemClicked(question: any): void {
    this.question = question;
    this.questionId = question.id;
    this.currentView = 'answers'; // Switch to answers view

    // Save selection to localStorage
    localStorage.setItem('question', JSON.stringify(question));
    localStorage.setItem('currentView', 'answers');
    console.log('Question clicked:', question);
  }

  // Handle when a discussion room is selected
  handleDiscussionRoomSelected(room: any): void {
    this.discussionRoom = room;
    this.currentView = 'discussionRoom'; // Switch to discussion room view

    // Save selection to localStorage
    // localStorage.setItem('discussionRoom', JSON.stringify(room));
    localStorage.setItem('currentView', 'discussionRoom');
    console.log('Discussion room selected:', room);
  }

  handleBackToList(): void {
    this.currentView = 'list'; // Switch back to question list view

    // Save selection to localStorage
    localStorage.setItem('currentView', 'list');
  }
}
