// src/app/shared/input-field/input-field.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mb-4">
      <label *ngIf="label" class="block text-gray-700 text-sm font-bold mb-2">{{ label }}</label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [value]="model"           (input)="onInputChange($event)" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  `,
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  // This is the @Input property that receives the value from the parent
  @Input() model: any;

  // This is the @Output event that Angular looks for to update the parent's bound variable
  // Its name MUST be 'model' + 'Change'
  @Output() modelChange = new EventEmitter<any>();

  // This method is called whenever the input value changes
  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.model = newValue; // Update the internal 'model' property
    this.modelChange.emit(newValue); // Emit the new value through 'modelChange'
  }
}