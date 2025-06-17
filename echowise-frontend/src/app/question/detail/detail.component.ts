import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() question!: string; // Question text
  @Input() username!: string; // Username of the person who posted the question
  @Input() votes!: number; // Number of votes
  @Input() description!: string; // Description of the question
  @Input() creationDate!: string; // Creation date of the question
  @Input() lastEditedDate!: string; // Last edited date of the question
  @Input() communityCode!: number; // Community code
  @Input() status!: string; // Status of the question
  @Input() tags!: string[]; // Tags associated with the question
 
}
