import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Session } from 'inspector';

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
  thisUserName = sessionStorage.getItem('username'); // Get the current user's ID from session storage
  @Output() backToList = new EventEmitter<void>(); // EventEmitter to notify parent to navigate back

  @Input() questionId: any; // Variable to store question ID
  isUpdatePopupVisible = false; // Control visibility of the update popup
  updatedAnswerContent = '';
  answerToUpdateId: number | null = null; // Store the ID of the answer being updated

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

  deleteAnswer(answerId: number) {
    if (confirm('Are you sure you want to delete this answer?')) {
      this.authService.deleteAnswer(answerId).subscribe({
        next: () => {
          console.log('Answer deleted successfully:', answerId);
          this.answers = this.answers.filter(answer => answer.answerId !== answerId); // Remove the deleted answer from the list
        },
        error: (err) => {
          console.error('Failed to delete answer:', err);
          alert('Failed to delete the answer. Please try again.');
        }
      });
    }
  }

  showUpdatePopup(answer: any) {
    this.isUpdatePopupVisible = true;
    this.updatedAnswerContent = answer.content; // Pre-fill the popup with the current answer content
    this.answerToUpdateId = answer.answerId; // Store the ID of the answer being updated
  }

  closeUpdatePopup() {
    this.isUpdatePopupVisible = false;
    this.updatedAnswerContent = '';
    this.answerToUpdateId = null;
  }

  updateAnswer() {
    if (this.updatedAnswerContent.trim() && this.answerToUpdateId !== null) {
      const updateData = { content: this.updatedAnswerContent };

      this.authService.updateAnswer(this.answerToUpdateId, updateData).subscribe({
        next: (response) => {
          console.log('Answer updated successfully:', response);
          const answer = this.answers.find(a => a.answerId === this.answerToUpdateId);
          if (answer) {
            answer.content = response.content; // Update the answer content locally
          }
          this.closeUpdatePopup(); // Close the popup
        },
        error: (err) => {
          console.error('Failed to update answer:', err);
          alert('Failed to update the answer. Please try again.');
        }
      });
    }
  }


  navigateBack() {
    console.log('Navigating back to question list');
    this.backToList.emit(); // Emit event to notify parent to navigate back
  }
}