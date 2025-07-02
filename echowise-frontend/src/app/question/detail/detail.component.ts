import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() id!: number; // Question ID
  @Input() question!: string; // Question text
  @Input() username!: string; // Username of the person who posted the question
  @Input() description!: string; // Description of the question
  @Input() creationDate!: string; // Creation date of the question
  @Input() lastEditedDate!: string; // Last edited date of the question
  @Input() communityCode!: number; // Community code
  @Input() status!: string; // Status of the question
  @Input() tags!: string[]; // Tags associated with the question
  @Output() questionUpdated = new EventEmitter<any>();
  @Output() questionDeleted = new EventEmitter<void>();
  currentUser: string = sessionStorage.getItem('username') || ''; // Get the current user's username from session storage
  isEditMode = false;
  updatedTitle!: string;
  updatedDescription!: string;
  updatedTagsString!: string; // Comma-separated tags string

  enableEditMode(): void {
    this.isEditMode = true;
    this.updatedTitle = this.question; // Initialize with current title
    this.updatedDescription = this.description; // Initialize with current description
    this.updatedTagsString = this.tags.join(', '); // Convert tags array to comma-separated string
  }

  saveChanges(): void {
    if (this.updatedTitle.trim() && this.updatedDescription.trim() && this.updatedTagsString.trim()) {
      const updatedTagsArray = this.updatedTagsString.split(',').map(tag => tag.trim()); // Convert string to array
      this.questionUpdated.emit({
        id: this.id, // Include the question ID for updating
        title: this.updatedTitle,
        description: this.updatedDescription,
        tags: updatedTagsArray
      });
      this.isEditMode = false; // Exit edit mode after saving
    } else {
      alert('Title, description, and tags cannot be empty.');
    }
  }

  deleteQuestion(): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionDeleted.emit(); // Emit event to notify parent component
    }
  }
}