// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode for token validation
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8085/api/auth'; // Backend URL for authentication
  private communityBaseUrl = 'http://localhost:8085/api/communities'; // Backend URL for communities

  cachedCommunities: { id: number; name: string }[] = []; // Add this property to store cached communities

  constructor(private http: HttpClient) { }

  /**
   * Login method to authenticate the user.
   * Sends username and password to the backend.
   */
  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginRequest, { withCredentials: true }).pipe(
      tap((response: any) => {
        // Assuming the response contains userId and username
        const { id, username } = response;
        console.log('Login successful:', response);
        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('username', username);
      })
    );;
  }

  /**
   * Register method to create a new user.
   * Sends username, email, and password to the backend.
   */
  register(username: string, email: string, password: string): Observable<any> {
    const signupRequest = { username, email, password };
    return this.http.post(`${this.baseUrl}/register`, signupRequest);
  }

  /**
   * Logout method to clear the JWT cookie.
   */
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        // Clear session storage on successful logout
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        console.log('User logged out and session storage cleared.');
      })
    );
    // Enable credentials for cookies
  }

  /**
   * Create Community method.
   * Sends community name and description to the backend.
   */
  createCommunity(request: { name: string; description: string }): Observable<any> {
    return this.http.post(`${this.communityBaseUrl}`, request, { withCredentials: true });
  }

  /**
   * Get Users in Community method.
   * Fetches the list of users in a specific community.
   */
  getUsersInCommunity(communityCode: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.communityBaseUrl}/${communityCode}/users`, { withCredentials: true });
  }

  /**
   * Get User Communities method.
   * Fetches the list of communities the user is part of.
   */
  getUserCommunities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.communityBaseUrl}`, { withCredentials: true });
  }

  getQuestionsByCommunity(communitycode: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.communityBaseUrl}/${communitycode}/questions`, { withCredentials: true });
  }

  getRoomsByCommunity(communityCode: string): Observable<any[]> {

    return this.http.get<any[]>(`${this.communityBaseUrl}/${communityCode}/rooms`, { withCredentials: true });
  }

  /**
   * Join Community method.
   * Sends community code to the backend to join a community.
   */
  joinCommunity(request: { communityCode: string }): Observable<any> {
    return this.http.post(`${this.communityBaseUrl}/join`, request, {
      withCredentials: true,
      responseType: 'text' // Expect plain text response
    });
  }

  /**
 * Create a new question in a specific community.
 * Sends the question data to the backend.
 */
  createQuestion(communityId: number, questionData: { title: string; description: string; tags: string[] }): Observable<any> {
    console.log('Creating question with data:', questionData); // Debugging
    return this.http.post<any>(`${this.communityBaseUrl}/${communityId}/questions`, questionData, { withCredentials: true });
  }

  createDiscussionRoom(communityCode: string, payload: { name: string; description: string; memberUsernames: string[] }): Observable<any> {
    return this.http.post<any>(`${this.communityBaseUrl}/${communityCode}/rooms`, payload, { withCredentials: true });
  }

  getAnswersByquestionId(questionId: string): Observable<any> {
    //const communityId = this.getCommunityIdByName(communityName); // Assume this method exists to fetch communityId by name
    return this.http.get<any>(`http://localhost:8085/api/questions/${questionId}/answers`, { withCredentials: true });
  }

  vote(answerId: string, payload: { voteType: string }): Observable<any> {
    return this.http.post<any>(`http://localhost:8085/api/answers/${answerId}/vote`, payload, { withCredentials: true });
  }

  private getCommunityIdByName(communityName: string): number {
    // Mock implementation to fetch communityId by name
    // Replace this with actual logic if needed
    const community = this.cachedCommunities.find(c => c.name === communityName);
    return community ? community.id : 0;
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime; // Check if the token is not expired
    } catch (error) {
      return false; // Return false if the token is invalid
    }

  }
}
