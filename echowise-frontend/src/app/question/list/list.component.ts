import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';
import { PostComponent } from '../post/post.component';
import { AuthService } from '../../auth/auth.service';
import { CommunityDetailComponent } from '../../community/community-detail/community-detail.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DetailComponent, PostComponent, CommunityDetailComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private authService: AuthService) { }
  @Input() questions: any[] = []; // Accept questions as input
  @Input() communityCode!: number;
  isPostPopupVisible = false; // Control visibility of the Post popup
  isCommunityDetailPopupVisible = false;
  communityDetail: any = null; // Store community details for the popup

  ngOnChanges(changes: SimpleChanges) {
    if (changes['questions']) {
      console.log('Questions received in ListComponent:', this.questions); // Debugging
    }
  }

  showPostPopup() {
    this.isPostPopupVisible = true; // Show the Post popup
  }

  closePostPopup() {
    this.isPostPopupVisible = false; // Hide the Post popup
  }

  showCommunityDetailPopup() {
    this.authService.getCommunityDetails(this.communityCode).subscribe({
      next: (response) => {
        console.log('Community details fetched successfully:', response);
        this.communityDetail = response; // Store the community details
        this.isCommunityDetailPopupVisible = true; // Show the popup
      },
      error: (err) => {
        console.error('Failed to fetch community details:', err);
        alert('Failed to fetch community details. Please try again.');
      }
    });
  }

  closeCommunityDetailPopup() {
    this.isCommunityDetailPopupVisible = false; // Hide the popup
  }

  handleQuestionSubmitted(questionData: { title: string; description: string; tags: string[] }) {
    console.log('Question Submitted:', questionData);
    console.log("community code @ post", this.communityCode);
    this.isPostPopupVisible = false; // Hide the Post popup after submission
    // this.questions.push(questionData); // Add the new question to the list
    this.authService.createQuestion(this.communityCode, questionData).subscribe({
      next: (response) => {
        console.log('Question created successfully:', response);
        this.questions.push(response); // Add the new question to the list
      },
      error: (err) => {
        console.error('Failed to create question:', err);
        alert('Failed to post the question. Please try again.');
      }
    });
  }

  @Output() clickenter = new EventEmitter<void>(); // Event emitter for click events

  GoToAnswers(question: any) {
    console.log('Answers button clicked');
    this.clickenter.emit(question); // Emit event to notify parent to navigate back
  }
}
