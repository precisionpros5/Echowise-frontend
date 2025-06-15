import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CreateComponent } from './community/create/create.component';
import { JoinComponent } from './community/join/join.component';
import { HomeComponent } from './community/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'landing', component: LandingComponent },
    // { path: 'community/create', component: CreateComponent },
    // { path: 'community/join', component: JoinComponent },
    { path: 'community/home', component: HomeComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];
