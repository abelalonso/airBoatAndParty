import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Boat } from '../boat-interface';
import { BoatService } from '../boat.service';


@Component({
  selector: 'app-singleBoat',
  templateUrl: './singleBoat.component.html',
  styleUrls: ['./singleBoat.component.scss']
})
export class SingleBoatComponent implements OnInit {

  boat: Boat;
  boatId: string;

  constructor(private route: ActivatedRoute, private boatService: BoatService) {
    this.route.params.subscribe(params=>{
      this.boatId=params['id']
      this.boat = this.boatService.boats.filter(e=>e._id==this.boatId)[0];
    })
  }

  ngOnInit() {
  }

}
