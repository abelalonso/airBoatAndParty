import { Component, OnInit, Input } from '@angular/core';
import { BoatService } from '../boat.service';
import { Boat } from '../boat-interface';
import { SessionService } from '../../session/session.service';

@Component({
  selector: 'app-listBoats',
  templateUrl: './listBoats.component.html',
  styleUrls: ['./listBoats.component.scss']
})
export class ListBoatsComponent implements OnInit {

 // @Input() userId: string;
  @Input() boatList: Array<Boat>;

  constructor(private boatService: BoatService, private sessionService: SessionService) { }

  ngOnInit() {
    this.update();

  }

  update() {
    this.sessionService.isLogged().subscribe(()=>
      this.boatService.getBoats(this.sessionService.user._id).subscribe(boats=>{
        this.boatList=boats;
      })
    )
  }

  delete(boatId: string) {
    this.boatService.deleteBoat(boatId).subscribe( ()=>this.update());
  }

}
