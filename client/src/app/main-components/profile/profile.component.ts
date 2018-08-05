import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from '../../session/session.service';
import { BoatService } from '../boat.service';
import { Boat } from '../boat-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  boats: Array<Boat>
  emailForm = false;
  nameForm = false;

  constructor(private sessionService: SessionService, private boatService: BoatService, private router: Router) {

  }

  ngOnInit() {

  }
  update(){
    this.boatService.getBoats("").subscribe( boats => this.boats=boats);
  }

  updateEmail(email: string){
    this.sessionService.update({email}).subscribe(()=>{
      this.emailForm=false;
    })
  }

  updateName(name: string, surname: string){
    this.sessionService.update({name, surname}).subscribe(()=>{
      this.nameForm=false;
    })
  }

}
