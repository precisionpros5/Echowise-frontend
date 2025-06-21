import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css']
})
export class CommunityDetailComponent {
  @Input() name!: string;
  @Input() code!: number;
  @Input() description!: string;

  @Output() closePopup = new EventEmitter<void>(); // Emit event when popup is closed

  triggerClosePopup() {
    this.closePopup.emit(); // Notify parent component to close the popup
  }

  copyToClipboard() {
    const communityCode = this.code.toString(); // Convert communityCode to string
    navigator.clipboard.writeText(communityCode).then(() => {
      alert('Community Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy Community Code:', err);
      alert('Failed to copy Community Code. Please try again.');
    });
  }
}
