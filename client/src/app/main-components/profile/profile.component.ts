import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from '../../session/session.service';
import { BoatService } from '../boat.service';
import { Boat } from '../boat-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  boats: Array<Boat>
  //@Output() onBoatsUpdate = new EventEmitter<void>();

  constructor(private sessionService: SessionService, private boatService: BoatService) { }

  ngOnInit() {}


}
