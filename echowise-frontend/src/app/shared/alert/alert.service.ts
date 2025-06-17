import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertState = new BehaviorSubject<{ message: string; type: 'success' | 'error' | 'info' | null }>({ message: '', type: null });
  alertState$ = this.alertState.asObservable();

  showAlert(message: string, type: 'success' | 'error' | 'info'): void {
    this.alertState.next({ message, type });
    setTimeout(() => this.clearAlert(), 4000); // Auto-clear after 5 seconds
  }

  clearAlert(): void {
    this.alertState.next({ message: '', type: null });
  }
}