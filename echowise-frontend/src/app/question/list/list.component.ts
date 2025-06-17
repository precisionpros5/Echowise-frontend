import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';
import { CommunitySidebarComponent } from '../../shared/community-sidebar/community-sidebar.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DetailComponent, CommunitySidebarComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  // questions: any[] = [
  //   {
  //     questionId: 5,
  //     title: "question3",
  //     description: "test 3",
  //     creationDate: "2025-06-12T07:27:24",
  //     lastEditedDate: "2025-06-12T07:27:24",
  //     username: "methilesh1",
  //     communityCode: 289787,
  //     status: "ANSWERED",
  //     tags: ["java"]
  //   },
  //   {
  //     questionId: 6,
  //     title: "Question 3",
  //     description: "This is  test of post question",
  //     creationDate: "2025-06-12T14:41:37",
  //     lastEditedDate: "2025-06-12T14:41:37",
  //     username: "methilesh1",
  //     communityCode: 289787,
  //     status: "OPEN",
  //     tags: []
  //   },
  //   {
  //     questionId: 7,
  //     title: "Question 3",
  //     description: "This is  test of post question",
  //     creationDate: "2025-06-12T14:41:57",
  //     lastEditedDate: "2025-06-12T14:41:57",
  //     username: "methilesh1",
  //     communityCode: 289787,
  //     status: "OPEN",
  //     tags: ["java"]
  //   }
  // ]; // Placeholder data for testing

  questions: any[] = []; // Initialize as an empty array

  onQuestionsFetched(questions: any[]) {
    this.questions = questions; // Update the questions list
  }
}
