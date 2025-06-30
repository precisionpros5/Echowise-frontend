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
  @Input() description!: string; // Description of the question
  @Input() creationDate!: string; // Creation date of the question
  @Input() lastEditedDate!: string; // Last edited date of the question
  @Input() communityCode!: number; // Community code
  @Input() status!: string; // Status of the question
  @Input() tags!: string[]; // Tags associated with the question
  @Output() questionUpdated = new EventEmitter<{ description: string }>();
  @Output() questionDeleted = new EventEmitter<void>();

  isEditMode = false;
  updatedDescription!: string;

  enableEditMode(): void {
    this.isEditMode = true;
    this.updatedDescription = this.description; // Initialize with current description
  }

  saveChanges(): void {
    if (this.updatedDescription.trim()) {
      this.questionUpdated.emit({ description: this.updatedDescription });
      this.isEditMode = false; // Exit edit mode after saving
    } else {
      alert('Description cannot be empty.');
    }
  }

  deleteQuestion(): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionDeleted.emit(); // Emit event to notify parent component
    }
  }
}
