import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { User } from '../User-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  signup(newUser: User){
    this.sessionService.signup(newUser).subscribe();
    this.router.navigate(['/']);
  }

  login(knownUser){
    this.sessionService.login(knownUser.username, knownUser.password).subscribe();
    this.router.navigate(['/']);
  }
}
