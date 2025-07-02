import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';
import { PostComponent } from '../post/post.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DetailComponent, PostComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private authService: AuthService) { }
  @Input() questions: any[] = []; // Accept questions as input
  @Input() communityCode!: number;
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
  handleUpdateQuestion(event: { id: number, title: string; description: string; tags: string[] }): void {
    console.log('Updating question:', event);

    this.authService.updateQuestion(event.id, {
      title: event.title,
      description: event.description,
      tags: event.tags
    }).subscribe({
      next: (response) => {
        console.log('Question updated successfully:', response);

        // Update the question in the local list
        const questionIndex = this.questions.findIndex((q) => q.questionId === event.id);
        console.log('Question index:', questionIndex); // Debugging log
        if (questionIndex !== -1) {
          this.questions[questionIndex].title = event.title;
          this.questions[questionIndex].description = event.description;
          this.questions[questionIndex].tags = event.tags;
        }
      },
      error: (err) => {
        console.error('Failed to update question:', err);
        alert('Failed to update the question. Please try again.');
      }
    });
  }

  handleDeleteQuestion(): void {
    console.log('Delete Question button clicked');
    // Logic to delete the question in the backend
  }
}
