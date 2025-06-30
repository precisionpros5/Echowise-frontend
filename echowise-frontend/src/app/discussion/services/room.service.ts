import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private baseUrl = 'http://localhost:8085/api'; // Adjust this if your API path is different

    constructor(private http: HttpClient) { }

    // Get room details by ID
    getRoomById(roomId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/rooms/${roomId}`);
    }

    // Update room details
    updateRoom(roomId: number,name: string): Observable<any> {
        return this.http.patch(`${this.baseUrl}/rooms/${roomId}`, name, {
            headers: {
              'Content-Type': 'text/plain' // Specify the content type as plain text
            },
            withCredentials: true
          });
        }

    // Delete a room
    deleteRoom(roomId: number): Observable<string> {
        return this.http.delete<string>(`${this.baseUrl}/rooms/${roomId}`, {
            responseType: 'text' as 'json', // Ensure the response is treated as text
          withCredentials: true
        });
    }

    // Add members to a room
    addMembers(roomId: number, usernames: string[]): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/rooms/${roomId}/members`, usernames, {
          withCredentials: true
        });
      }

    getRoomDetails(roomId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/rooms/${roomId}`, { withCredentials: true });
      }
    
      getRoomMembers(roomId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/rooms/${roomId}/users`, { withCredentials: true });
      }
}
