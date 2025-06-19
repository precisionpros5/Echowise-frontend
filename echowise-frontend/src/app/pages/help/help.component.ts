
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
            category: 'Account',
            questions: [
                { q: 'How do I reset my password?', a: 'Go to settings > security > reset password.' },
                { q: 'How do I delete my account?', a: 'Contact support to request account deletion.' }
            ]
        },
        {
            category: 'Community',
            questions: [
                { q: 'How do I join a group?', a: 'Navigate to Groups and click Join on any group.' },
                { q: 'Can I create my own group?', a: 'Yes, click on Create Group in the Groups section.' }
            ]
        },
        {
            category: 'Technical',
            questions: [
                { q: 'Why is the app slow?', a: 'Try clearing your cache or check your internet connection.' },
                { q: 'How do I report a bug?', a: 'Use the contact form or email support with details.' }
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