
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        FormsModule
    ],
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    searchTerm: string = '';

    faqs = [
        
        {
            category: 'Community',
            questions: [
                { q: 'How do I join a group?', a: 'Navigate to Groups and click Join on any group.' },
                { q: 'Can I create my own group?', a: 'Yes, click on Create Group in the Groups section.' },
                { q: 'How do I create a new community?', a: 'Go to the "Communities" section and click on "Create Community." Fill in the name and description, then generate a unique code.' },
                { q: 'How do I join a community using a code?', a: 'Click "Join Community" and enter the code provided by the community admin.' }
            ]
        },
        {
            category: 'Q&A System',
            questions: [
                { q: 'How do I post a question in a community?', a: 'Navigate to the community, click "Post your question," and fill in the title, description, and tags.' },
                { q: 'Can I edit or delete my question after posting?', a: 'Currently, you can only delete your question. Editing is not supported in this version.' },
                { q: 'What does it mean when a question is marked as “Closed”?', a: 'It means the question is no longer accepting answers, either because it was resolved or closed by a moderator.' }
            ]
        },
        {
            category: 'Discussion Rooms',
            questions: [
                { q: 'What is the difference between public and private discussion rooms?', a: 'Public rooms are open to all community members, while private rooms require an invitation or code to join.' },
                { q: 'How do I create a private discussion room?', a: 'Go to the community, click “+ New” under discussions, and select “Private.” Then invite members using their usernames.' }
            ]
        },
        {
            category: 'Technical',
            questions: [
                { q: 'Why is the app slow?', a: 'Try clearing your cache or check your internet connection.' },
                { q: 'How do I report a bug?', a: 'Use the contact form or email support with details.' },
                { q: 'Why can’t I join a discussion room?', a: 'Ensure you have the correct invitation code or that the room is not restricted.' },
                { q: 'How do I report inappropriate content?', a: 'Use the “Contact Support” button at the bottom of the Help Center to report issues.' }
            ]
        }
    ];

    get filteredFaqs() {
        if (!this.searchTerm.trim()) return this.faqs;
        const term = this.searchTerm.toLowerCase();
        return this.faqs
            .map(cat => ({
                ...cat,
                questions: cat.questions.filter(q => q.q.toLowerCase().includes(term) || q.a.toLowerCase().includes(term))
            }))
            .filter(cat => cat.questions.length > 0);
    }
}