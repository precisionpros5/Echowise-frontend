import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthService } from '../../auth/auth.service';
import { ListComponent } from '../../question/list/list.component';
import { DetailComponent } from '../../question/detail/detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-queries',
  imports: [DetailComponent, ListComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './your-queries.component.html',
  styleUrls: ['./your-queries.component.css']
})
export class YourQueriesComponent implements OnInit {
  communities: any[] = []; // Store the list of communities
  questionsByCommunity: { [key: string]: any[] } = {}; // Store questions grouped by community
  currentUsername = sessionStorage.getItem('username'); // Get current user ID from session storage
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchCommunities();
    console.log('communities:', this.communities); // Debugging
    console.log('questionsByCommunity:', this.questionsByCommunity); // Debugging
  }

  fetchCommunities(): void {
    this.authService.getUserCommunities().subscribe({
      next: (response) => {
        this.communities = response; // Store the list of communities
        this.fetchQuestionsForCommunities();
      },
      error: (err) => {
        console.error('Failed to fetch communities:', err);
        alert('Failed to fetch communities. Please try again.');
      }
    });
  }

  fetchQuestionsForCommunities(): void {
    this.communities.forEach((community) => {
      this.authService.getQuestionsByCommunity(community.code).subscribe({
        next: (questions) => {
          this.questionsByCommunity[community.code] = questions; // Group questions by community name
        },
        error: (err) => {
          console.error(`Failed to fetch questions for community ${community.name}:`, err);
          alert(`Failed to fetch questions for community ${community.name}. Please try again.`);
        }
      });
    });
  }

  GoToAnswers(question: any): void {
    console.log('Navigating to answers for question:', question);
    // Logic to navigate to the answers page or component
  }
}
