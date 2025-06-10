import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngIf="message" class="alert" [ngClass]="type">{{ message }}</div>`,
  styles: [`
    .alert { padding: 10px; margin: 10px 0; border-radius: 4px; }
    .success { background-color: #d4edda; color: #155724; }
    .error { background-color: #f8d7da; color: #721c24; }
  `]
})
export class AlertComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' = 'success';
}
