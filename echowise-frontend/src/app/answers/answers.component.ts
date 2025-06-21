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
    if (this.newAnswer.trim()) {
      const answerData = { content: this.newAnswer };

      this.authService.postAnswer(this.question.questionId, answerData).subscribe({
        next: (response) => {
          console.log('Answer posted successfully:', response);
          const newAnswerObj = {
            content: response.content,
            voteCount: 0,
            username: response.username, // Assuming the response contains the username
            creationDate: new Date().toISOString(), // Use the current date or the one from the response
            answerId: response.answerId // Assuming the response contains the answer ID
          };
          this.answers.push(newAnswerObj); // Add the new answer to the list
          this.newAnswer = ''; // Clear the input field
        },
        error: (err) => {
          console.error('Failed to post answer:', err);
          alert('Failed to post the answer. Please try again.');
        }
      });
    }
  }

  navigateBack() {
    console.log('Navigating back to question list');
    this.backToList.emit(); // Emit event to notify parent to navigate back
  }
}