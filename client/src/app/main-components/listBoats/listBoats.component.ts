import { Component, OnInit } from '@angular/core';
import { BoatService } from '../boat.service';

@Component({
  selector: 'app-listBoats',
  templateUrl: './listBoats.component.html',
  styleUrls: ['./listBoats.component.scss']
})
export class ListBoatsComponent implements OnInit {

  constructor(private boatService: BoatService) { }

  ngOnInit() {
    this.boatService.getBoats().subscribe();
  }

}
