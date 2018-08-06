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
  @Input() userId;

  constructor(public boatService: BoatService, public sessionService: SessionService) { }

  ngOnInit() {
    this.update();
  }

  update() {
      this.boatService.getBoats(this.userId).subscribe(boats=>{
        this.boatList=boats;
    })
  }

  delete(boatId: string) {
    this.boatService.deleteBoat(boatId).subscribe( ()=>this.update());
  }

}
