import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../session/session.service';
import { BoatService } from '../boat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private sessionService: SessionService, private boatService: BoatService) { }

  ngOnInit() {
  }

  showBoatForm(){
    this.boatService.showBoatForm = true;
  }

  cancel(){
    this.boatService.showBoatForm = false;
  }
}
