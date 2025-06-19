import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './community/home/home.component';
import { DiscussionRoomComponent } from './discussion/discussion-room/discussion-room.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HelpComponent } from './pages/help/help.component';

// import { AboutPageComponent } from './pages/about/about-page/about-page.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { HelpComponent } from './pages/help/help.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'community/home', component: HomeComponent, canActivate: [AuthGuard] }, // Add your AuthGuard here if needed
    { path: 'discussion', component: DiscussionRoomComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'help', component: HelpComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];
