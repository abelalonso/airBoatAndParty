import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Boat } from '../boat-interface';
import { BoatService } from '../boat.service';
import { SessionService } from '../../session/session.service';


@Component({
  selector: 'app-singleBoat',
  templateUrl: './singleBoat.component.html',
  styleUrls: ['./singleBoat.component.scss']
})
export class SingleBoatComponent implements OnInit {

  boat: Boat;
  boatId: string;

  constructor(private route: ActivatedRoute, public boatService: BoatService, public sessionService: SessionService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.boatId=params['id'];
      this.boatService.getBoats(null).subscribe(()=> 
        this.boat = this.boatService.boats.filter(e=>e._id==this.boatId)[0])
    })
  }

}
