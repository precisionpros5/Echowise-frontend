import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommunitySidebarComponent } from '../../shared/community-sidebar/community-sidebar.component';
import { PostComponent } from '../../question/post/post.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component'; // Import NavbarComponent

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CommunitySidebarComponent, PostComponent, NavbarComponent], // Add NavbarComponent to imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery = '';
  contentList = [
    { user: 'User 1', question: 'What is Angular?', answer: 'Angular is a framework for building web applications.' },
    { user: 'User 2', question: 'How to use ngModel?', answer: 'You can use ngModel for two-way data binding.' },
    { user: 'User 3', question: 'What is TypeScript?', answer: null }
  ];

  showPostQuestionPopup = false;

  onCommunityJoined(community: string) {
    alert(`Joined community: ${community}`);
  }

  onCommunityCreated() {
    alert('Creating a new community...');
  }

  postQuestion() {
    this.showPostQuestionPopup = true;
  }

  handleQuestionSubmitted(questionData: { title: string; description: string; tags: string }) {
    console.log('Question Submitted:', questionData);
    this.showPostQuestionPopup = false;
  }
}
