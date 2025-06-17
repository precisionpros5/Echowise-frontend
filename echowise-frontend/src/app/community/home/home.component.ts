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
  selectedCommunityName = '';
  communityCode = ''; // Add communityCode property
  isPostPopupVisible = false; // Control visibility of the Post popup
  questions: any[] = []; // Store the questions received from the sidebar
  showList: boolean = true; // Controls whether the list is displayed
  questionId: string | null = null;
  showDiscussionRoom: boolean = false; // Controls whether the discussion room is displayed

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

  handleQuestionSubmitted(questionData: { title: string; description: string; tags: string }) {
    console.log('Question Submitted:', questionData);
    this.isPostPopupVisible = false; // Hide the Post popup after submission
    // Add logic to handle the submitted question (e.g., update the list of questions)
  }

  onQuestionsFetched(questions: any[]) {
    console.log('Questions fetched @ HomeComponent:', questions);
    this.questions = questions; // Update the questions array
  }

  handleItemClicked(question: any) {
    this.showList = false; // Hide the list and show the answers
    this.questionId = question.id;

  }

  handleBackToList() {
    this.showList = true; // Show the list and hide the answers
  }

}
