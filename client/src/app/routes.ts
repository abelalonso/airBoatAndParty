import { Routes } from '@angular/router';
import { SignupComponent } from './session/signup/signup.component';
import { ProfileComponent } from './main-components/profile/profile.component';
import { SingleBoatComponent } from './main-components/singleBoat/singleBoat.component';
import { HomeComponent } from './main-components/home/home.component';

export const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'boats/:id', component: SingleBoatComponent}
]