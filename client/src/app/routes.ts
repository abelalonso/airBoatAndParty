import { Routes } from '@angular/router';
import { SignupComponent } from './session/signup/signup.component';
import { ProfileComponent } from './main-components/profile/profile.component';

export const routes: Routes =[
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent}
]