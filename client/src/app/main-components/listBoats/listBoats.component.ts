import { Component, OnInit, Input } from '@angular/core';
import { BoatService } from '../boat.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-listBoats',
  templateUrl: './listBoats.component.html',
  styleUrls: ['./listBoats.component.scss']
})
export class ListBoatsComponent implements OnInit {

  @Input() userId: string;

  constructor(private boatService: BoatService) { }

  ngOnInit() {
    this.update();
  }

  update() {
    this.boatService.getBoats(this.userId).subscribe();
  }

}
