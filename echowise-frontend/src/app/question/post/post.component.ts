import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  questionTitle = '';
  questionDescription = '';
  questionTags = '';

  @Output() questionSubmitted = new EventEmitter<{ title: string; description: string; tags: string }>();
  @Output() popupClosed = new EventEmitter<void>(); // Emit event for closing the popup

  submitQuestion() {
    const questionData = {
      title: this.questionTitle,
      description: this.questionDescription,
      tags: this.questionTags
    };
    this.questionSubmitted.emit(questionData); // Emit the submitted question data
  }

  closePopup() {
    this.popupClosed.emit(); // Emit popupClosed event
  }
}
