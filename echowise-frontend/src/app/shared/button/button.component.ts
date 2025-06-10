import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [ngClass]="type" (click)="onClick()">{{ label }}</button>`,
  styles: [`
    button { padding: 10px 20px; margin: 5px; }
    .primary { background-color: #007bff; color: white; }
    .secondary { background-color: #6c757d; color: white; }
  `]
})
export class ButtonComponent {
  @Input() label = 'Click';
  @Input() type = 'primary';
  @Input() onClick = () => { };
}
