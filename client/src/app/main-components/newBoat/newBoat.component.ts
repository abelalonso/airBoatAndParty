import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BoatService } from '../boat.service';
import { SessionService } from '../../session/session.service';
import { Boat } from '../boat-interface';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StationService } from '../station.service';

const { BASEURL } = environment;

@Component({
  selector: 'app-newBoat',
  templateUrl: './newBoat.component.html',
  styleUrls: ['./newBoat.component.scss']
})

export class NewBoatComponent implements OnInit {

  uploader: FileUploader = new FileUploader ({
    url: `${BASEURL}/api/boats`,
    method: 'POST'
  });
  feedback;

  @Output() onUpdateBoats = new EventEmitter();

  newBoat: Boat = {
    name:"", 
    crew:null, 
    capacity:null, 
    description:"", 
    patron:false, 
    pricePerDay:null, 
    station: ""
  }

  stations;
  city;

  
  constructor(public boatService: BoatService, public sessionService: SessionService, private router: Router, public stationService: StationService) { }

  ngOnInit() {

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
    
  }
  showBoatForm(){
    this.boatService.showBoatForm = true;
    this.stationService.getStations().subscribe( stations => {
      this.stations = stations;
    });
  }

  addBoat(newBoat: Boat){
    newBoat.owner = this.sessionService.user._id;

    if(!newBoat.patron){newBoat.crew=0}

    newBoat.station = this.stations.filter(e=>e.nombre===this.city).pop();
    console.log(newBoat.station);

    if((this.uploader._nextIndex==0) && (this.uploader.queue.length==0)){
      this.boatService.addBoat(newBoat).subscribe( () => {
        this.boatService.showBoatForm = false;
        this.onUpdateBoats.emit()
      });

      console.log(newBoat)
    } else {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('name', newBoat.name);
        form.append('patron', newBoat.patron);
        form.append('capacity', newBoat.capacity);
        form.append('crew', newBoat.crew);
        form.append('description', newBoat.description);
        form.append('pricePerDay', newBoat.pricePerDay);
        form.append('station', newBoat.station);
        form.append('owner', this.sessionService.user._id);
       }; 
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {
        this.boatService.showBoatForm = false;
        this.onUpdateBoats.emit()
      };
    }
  }
}
