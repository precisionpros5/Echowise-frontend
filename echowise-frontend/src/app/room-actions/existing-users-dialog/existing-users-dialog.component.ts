import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../../discussion/services/room.service'; // Adjust path

@Component({
  selector: 'app-existing-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './existing-users-dialog.component.html',
  styleUrls: ['./existing-users-dialog.component.css']
})
export class ExistingUsersDialogComponent {
  users: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ExistingUsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number },
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.roomService.getRoomMembers(this.data.roomId).subscribe((members: string[]) => {
      this.users = members;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

