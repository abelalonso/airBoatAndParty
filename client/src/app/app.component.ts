import { Component } from '@angular/core';
import { SessionService } from './session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';

  constructor(private sessionService: SessionService){}

  logout(){
    this.sessionService.logout().subscribe();
  }
}
