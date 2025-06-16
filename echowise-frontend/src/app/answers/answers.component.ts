import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AnswersComponent {
  @Input() question: any; // Input property to receive question data
  answers: any[] = []; // Array to store answers
  newAnswer: string = ''; // Variable to store the new answer text
  @Output() backToList = new EventEmitter<void>(); // EventEmitter to notify parent to navigate back

  ngOnInit() {
    // Initialize answers from the question object
    this.answers = this.question.answers;
  }

  handleVote(index: number, type: string) {
    // Handle upvote or downvote
    if (type === 'up') {
      this.answers[index].votes += 1;
    } else {
      this.answers[index].votes -= 1;
    }
  }

  handleAddAnswer() {
    // Add a new answer to the list
    if (this.newAnswer.trim()) {
      const newAnswerObj = {
        text: this.newAnswer,
        votes: 0,
        user: 'Current User' // Replace with actual user data
      };
      this.answers.push(newAnswerObj);
      this.newAnswer = ''; // Clear the input field
    }
  }
  navigateBack() {
    console.log('Navigating back to question list');
    this.backToList.emit(); // Emit event to notify parent to navigate back
  }
}