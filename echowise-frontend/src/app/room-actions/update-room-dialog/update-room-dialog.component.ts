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
  currentRoom: any = {}; // Initialize currentRoom to hold room details
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number },
    private roomService: RoomService
  ) {
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.loadRoomDetails();
  }

  loadRoomDetails() {
    this.roomService.getRoomById(this.data.roomId).subscribe(room => {
      this.updateRoomForm.patchValue({
        name: room.name
      });
    });
  }

  onSubmit() {
    if (this.updateRoomForm.valid) {
      this.roomService.updateRoom(this.data.roomId, this.updateRoomForm.value.name).subscribe(
        (response: any) => {
          console.log('Room details updated successfully:', response);
          this.currentRoom.name = response.name; // Update the local room name
          this.currentRoom.communityId = response.communityId; // Update communityId
          this.currentRoom.isPrivate = response.isPrivate; // Update privacy status
          localStorage.setItem('selectedRoom', JSON.stringify(this.currentRoom)); // Store updated room in local storage
          console.log('Updated room details:', this.currentRoom);
          this.dialogRef.close(response.name);
          alert('Room details updated successfully!');
        },
        (err: any) => {
          console.error('Failed to update room details:', err);
          alert('Failed to update room details. Please try again.');
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
