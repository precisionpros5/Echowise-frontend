import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private baseUrl = '/api/rooms'; // Adjust this if your API path is different

    constructor(private http: HttpClient) { }

    // Get room details by ID
    getRoomById(roomId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${roomId}`);
    }

    // Update room details
    updateRoom(roomId: string, data: { name: string; description: string }): Observable<any> {
        return this.http.put(`${this.baseUrl}/${roomId}`, data);
    }

    // Delete a room
    deleteRoom(roomId: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${roomId}`);
    }

    // Add members to a room
    addMembers(roomId: string, memberIds: string[]): Observable<any> {
        return this.http.post(`${this.baseUrl}/${roomId}/members`, { members: memberIds });
    }

    // Get existing members of a room
    getRoomMembers(roomId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${roomId}/members`);
    }
}
