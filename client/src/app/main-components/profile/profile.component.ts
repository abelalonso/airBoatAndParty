import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from '../../session/session.service';
import { BoatService } from '../boat.service';
import { Boat } from '../boat-interface';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

const { BASEURL } = environment;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  boats: Array<Boat>
  emailForm = false;
  nameForm = false;
  imageForm = false;
  userId;

  uploader: FileUploader = new FileUploader ({
    url: `${BASEURL}/api/auth/update/${this.sessionService.user._id}`,
    method: 'PATCH'
  });
  feedback;

  constructor(private sessionService: SessionService, private boatService: BoatService, private router: Router) {

  }

  ngOnInit() {

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.sessionService.isLogged().subscribe();
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
    
  }
  update(){
    this.boatService.getBoats("").subscribe( boats => this.boats=boats);
  }

  updateEmail(email: string){
    this.sessionService.update({email}).subscribe(()=>{
      this.emailForm=false;
    })
  }

  updateName(name: string, surname: string){
    this.sessionService.update({name, surname}).subscribe(()=>{
      this.nameForm=false;
    })
  }

  updateImage(){
    this.uploader.uploadAll();
 //     this.uploader.onCompleteItem = () => {
        this.imageForm = false;

   //   };
  }

}
