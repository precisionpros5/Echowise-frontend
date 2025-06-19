import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

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

  @Input() questionId: any; // Variable to store question ID
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.question.questionId) {
      console.log('Fetching answers for question ID:', this.question.questionId);
      this.authService.getAnswersByquestionId(this.question.questionId).subscribe({
        next: (response: any[]) => {
          console.log('Fetched answers:', response);
          this.answers = response; // Store the fetched answers
        },
        error: (err: any) => {
          console.error('Failed to fetch answers:', err);
        }
      });
    } else {
      console.warn('No question ID provided.');
    }
  }

  handleVote(answerId: string, voteType: string) {
    const payload = { voteType };
    this.authService.vote(answerId, payload).subscribe({
      next: (response: any) => {
        if (typeof response === 'string') {
          // If the response is a string, show it as an alert
          alert(response);
        } else {
          console.log(`Vote successful for answerId: ${answerId}, voteType: ${voteType}`);
          // Update the vote count locally
          const answer = this.answers.find(a => a.answerId === answerId);
          if (answer) {
            if (voteType === 'UPVOTE') {
              answer.voteCount += 1;
            } else if (voteType === 'DOWNVOTE') {
              answer.voteCount -= 1;
            }
          }
        }
      },
      error: (err: any) => {
        console.error(`Failed to vote for answerId: ${answerId}, voteType: ${voteType}`, err);
        // If the error contains a message, show it as an alert
        if (err.error && typeof err.error === 'string') {
          alert(err.error); // Display the error message from the server
        } else {
          alert('An error occurred while voting. Please try again.');
        }
      }
    });
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