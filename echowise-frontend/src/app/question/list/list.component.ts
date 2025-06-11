import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DetailComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  questions = [
    { question: 'What is Angular?', username: 'User1', votes: 10 },
    { question: 'How to use ngModel?', username: 'User2', votes: 5 },
    { question: 'What is TypeScript?', username: 'User3', votes: 8 }
  ];
}
