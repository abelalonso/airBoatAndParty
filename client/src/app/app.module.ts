import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './routes';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { SessionService } from './session/session.service';
import { BoatService } from './main-components/boat.service';
import { BookingService } from './main-components/booking.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './main-components/home/home.component';
import { SignupComponent } from './session/signup/signup.component';
import { ProfileComponent } from './main-components/profile/profile.component';
import { ListBoatsComponent } from './main-components/listBoats/listBoats.component';
import { SingleBoatComponent } from './main-components/singleBoat/singleBoat.component';
import { NewBoatComponent } from './main-components/newBoat/newBoat.component';
import { ListBookingsComponent } from './main-components/listBookings/listBookings.component';
import { NewBookingComponent } from './main-components/newBooking/newBooking.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    ProfileComponent,
    NewBoatComponent,
    ListBoatsComponent,
    ListBookingsComponent,
    SingleBoatComponent,
    NewBookingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService, BoatService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
