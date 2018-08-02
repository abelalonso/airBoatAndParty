import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-singleBoat',
  templateUrl: './singleBoat.component.html',
  styleUrls: ['./singleBoat.component.scss']
})
export class SingleBoatComponent implements OnInit {

  boatId: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.boatId = params['id'])
  }

  ngOnInit() {
  }

}
