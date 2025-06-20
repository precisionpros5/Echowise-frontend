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
import { AnswersComponent } from '../../answers/answers.component';
import { DiscussionRoomComponent } from '../../discussion/discussion-room/discussion-room.component';

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
    PostComponent,
    AnswersComponent,
    DiscussionRoomComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isJoinPopupVisible = false;
  isCreatePopupVisible = false;
  isCreateDiscussionGroupVisible = false;
  selectedCommunity: any;
  communityCode = ''; // Add communityCode property
  isPostPopupVisible = false; // Control visibility of the Post popup
  questions: any[] = []; // Store the questions received from the sidebar
  questionId: string | null = null;
  discussionRoom: any;// Store the selected discussion room ID
  currentView: 'list' | 'answers' | 'discussionRoom' | null = "list"; // Track the current view
  selectedCommunityCode: number | null = null; // Store the community code


  question = {
    title: 'How can I query if all POs in a container have reached a specific status?',
    description: 'I have multiple POs in one container. Each PO has a status. How to check if all POs in one container have reached a specific status?',
    user: 'laoda',
    answers: [
      {
        text: 'You can aggregate by container and use a HAVING clause to see what statuses it contains.',
        votes: 10,
        user: 'Thorsten Kettner'
      },
      {
        text: 'This is very simple. Just do what I suggested in my first comment.',
        votes: 5,
        user: 'laoda'
      }
    ]
  };


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
    this.currentView = 'list'; // Switch to the list view
    this.selectedCommunity = community; // Store the selected community name
    console.log('Community selected:', community);
  }

  // Handle when a question is clicked
  handleItemClicked(question: any): void {
    this.currentView = 'answers'; // Switch to the answers view
    this.question = question; // Store the selected question
    this.questionId = question.id; // Store the selected question ID
    console.log('Question clicked:', question);
  }

  // Handle when a discussion room is selected
  handleDiscussionRoomSelected(room: any): void {
    this.currentView = 'discussionRoom'; // Switch to the discussion room view
    this.discussionRoom = room; // Store the selected discussion room
    console.log('Discussion room selected:', room);
    // this.roomsFetched.emit(room);
  }
  handleBackToList(): void {
    this.currentView = 'list'; // Switch back to the list view

  }
  // onRoomsFetched(rooms: any[]) {
  //   console.log('Rooms fetched @ HomeComponent:', rooms);
  //   // You can handle the fetched rooms here, e.g., store them in a property
  //   this.discussionRoom = rooms; // Assuming you have a property to store the rooms
  //   // Emit the rooms to the parent component if needed
  //   // 
  // }

}
