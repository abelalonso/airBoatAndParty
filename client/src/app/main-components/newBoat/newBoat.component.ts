import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BoatService } from '../boat.service';
import { SessionService } from '../../session/session.service';
import { Boat } from '../boat-interface';

@Component({
  selector: 'app-newBoat',
  templateUrl: './newBoat.component.html',
  styleUrls: ['./newBoat.component.scss']
})
export class NewBoatComponent implements OnInit {

  @Output() onUpdateBoats = new EventEmitter();
  constructor(private boatService: BoatService, private sessionService: SessionService) { }

  ngOnInit() {
  }
  showBoatForm(){
    this.boatService.showBoatForm = true;
  }

  cancel(){
    this.boatService.showBoatForm = false;
  }

  addBoat(newBoat: Boat){
    newBoat.owner = this.sessionService.user._id;
    this.boatService.addBoat(newBoat).subscribe( () => {
      this.boatService.showBoatForm = false;
      this.onUpdateBoats.emit()
    });
  }
}
