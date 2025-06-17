import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DetailComponent, PostComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() questions: any[] = []; // Accept questions as input
  isPostPopupVisible = false; // Control visibility of the Post popup

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

  handleQuestionSubmitted(questionData: { title: string; description: string; tags: string }) {
    console.log('Question Submitted:', questionData);
    this.isPostPopupVisible = false; // Hide the Post popup after submission
    // Add logic to handle the submitted question (e.g., update the list of questions)
    this.questions.push(questionData); // Add the new question to the list
  }
}
