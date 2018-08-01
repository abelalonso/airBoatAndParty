import { Component, OnInit, Output } from '@angular/core';
import { BoatService } from '../boat.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-listBoats',
  templateUrl: './listBoats.component.html',
  styleUrls: ['./listBoats.component.scss']
})
export class ListBoatsComponent implements OnInit {

  constructor(private boatService: BoatService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.boatService.getBoats().subscribe();
  }

}
