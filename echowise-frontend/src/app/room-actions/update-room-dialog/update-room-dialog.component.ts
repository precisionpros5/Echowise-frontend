import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RoomService } from '../../discussion/services/room.service'; // Correct path to RoomService ; // Adjust path as needed

@Component({
  selector: 'app-update-room-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './update-room-dialog.component.html',
  styleUrls: ['./update-room-dialog.component.css']
})

export class UpdateRoomDialogComponent {
  updateRoomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
    private roomService: RoomService
  ) {
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.loadRoomDetails();
  }

  loadRoomDetails() {
    this.roomService.getRoomById(this.data.roomId).subscribe(room => {
      this.updateRoomForm.patchValue({
        name: room.name,
        description: room.description
      });
    });
  }

  onSubmit() {
    if (this.updateRoomForm.valid) {
      this.roomService.updateRoom(this.data.roomId, this.updateRoomForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
