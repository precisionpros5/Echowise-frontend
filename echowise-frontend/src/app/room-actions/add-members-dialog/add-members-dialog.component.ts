import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../../discussion/services/room.service'; // Adjust path as needed

@Component({
  selector: 'app-add-members-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './add-members-dialog.component.html',
  styleUrls: ['./add-members-dialog.component.css']
})

export class AddMembersDialogComponent {
  memberForm: FormGroup;
  memberIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMembersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
    private roomService: RoomService
  ) {
    this.memberForm = this.fb.group({
      memberId: ['']
    });
  }

  addMember() {
    const memberId = this.memberForm.value.memberId;
    if (memberId) {
      this.memberIds.push(memberId);
      this.memberForm.reset();
    }
  }

  submitMembers() {
    if (this.memberIds.length > 0) {
      this.roomService.addMembers(this.data.roomId, this.memberIds).subscribe(() => {
        alert('Members added successfully');
        this.dialogRef.close(true);
      });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

