import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html', // Use external HTML file
  styleUrls: ['./alert.component.css'] // Use external CSS file
})
export class AlertComponent implements OnInit {
  alertState: { message: string; type: 'success' | 'error' | 'info' | null } = { message: '', type: null };

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertState$.subscribe(state => {
      this.alertState = state;
    });
  }
}
