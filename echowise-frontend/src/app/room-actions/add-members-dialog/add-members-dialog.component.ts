import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';
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
export class AddMembersDialogComponent implements OnInit {
  memberForm: FormGroup;
  communityUsers: any[] = []; // All users in the community
  roomMembers: any[] = []; // Users already in the room
  usersToAdd: any[] = []; // Filtered users to display
  selectedUsers: string[] = []; // Selected users to add to the room

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<AddMembersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: number; communityId: number }
  ) {
    this.memberForm = this.fb.group({
      memberId: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const { roomId, communityId } = this.data;

    // Fetch all users in the community
    console.log('Fetching users for community ID:', communityId);
    this.authService.getUsersInCommunity(communityId).subscribe({
      next: (communityUsers: any[]) => {
        this.communityUsers = communityUsers;

        // Fetch users already in the room
        this.roomService.getRoomMembers(roomId).subscribe({
          next: (roomMembers: any[]) => {
            this.roomMembers = roomMembers;

            // Filter users to display only those not in the room
            this.usersToAdd = this.communityUsers.filter(
              (user) => !this.roomMembers.some((member) => member.username === user.username)
            );
          },
          error: (err: any) => {
            console.error('Failed to fetch room members:', err);
            alert('Failed to fetch room members. Please try again.');
          }
        });
      },
      error: (err: any) => {
        console.error('Failed to fetch community users:', err);
        alert('Failed to fetch community users. Please try again.');
      }
    });
  }

  onUserSelectionChange(event: any, username: string): void {
    if (event.target.checked) {
      this.selectedUsers.push(username);
    } else {
      this.selectedUsers = this.selectedUsers.filter((user) => user !== username);
    }
  }

  submitMembers(): void {
    const { roomId } = this.data;

    // Call the API to add members
    this.roomService.addMembers(roomId, this.selectedUsers).subscribe({
      next: () => {
        alert('Members added successfully!');
        this.dialogRef.close(true); // Close the dialog and return success
      },
      error: (err: any) => {
        console.error('Failed to add members:', err);
        alert('Failed to add members. Please try again.');
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Close the dialog without making changes
  }
}

