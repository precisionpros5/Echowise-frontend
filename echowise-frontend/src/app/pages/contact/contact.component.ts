import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule
    ],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    contactForm;

    constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            category: ['', Validators.required],
            message: ['', [Validators.required, Validators.minLength(10)]],
            file: [null]
        });

    }

    onSubmit() {
        if (this.contactForm.valid) {
            this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
            this.contactForm.reset();
        }
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.contactForm.patchValue({ file });
        }
    }
}