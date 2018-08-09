import { Component, OnInit } from "@angular/core";
import { SessionService } from "../session.service";
import { User } from "../User-interface";
import { Router } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import * as $ from "jquery";
import { environment } from '../../../environments/environment';

const { BASEURL } = environment;

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {

  error;

  uploader: FileUploader = new FileUploader ({
    url: `${BASEURL}/api/auth/signup`,
    method: 'POST'
  });
  feedback;

  newUser: User = {
    username: "", password: "", name:"", surname:"", email:"" 
  }
  username:"";
  password:"";

  constructor(public sessionService: SessionService, private router: Router) {}

  ngOnInit() {

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.sessionService.isLogged().subscribe(()=>
      this.router.navigate(['/']))
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
      console.log(this.feedback)
      this.error=this.feedback;
    };

    $(".username").change(()=>this.error=undefined);
    $(".password").change(()=>this.error=undefined)
    
    var container = $("#container");

    $(".btn[data-target]").on("click", function() {
      var btn = $(this),
        angle = 0;

      switch (btn.attr("data-target")) {
        case "login":
          angle = 0;
          break;
        case "agbs":
          angle = 90;
          break;
        case "info":
          angle = 180;
          break;
        case "register":
          angle = -90;
          break;
      }

      container.css(
        "transform",
        "translate3d(0, 0, -200px) rotate3d(0, 1, 0, " + angle + "deg)"
      );
    });

    $(".btn[data-action]").on("click", function() {
      var btn = $(this);

      if (btn.attr("data-action") === "login") {
        container.css(
          "animation",
          "shake 0.82s cubic-bezier(.36,.07,.19,.97) both"
        );

        setTimeout(function() {
          container.css("animation", "");
        }, 820);
      }
    });

  }

  signup(newUser: User) {
    console.log(this.uploader)
    if((this.uploader._nextIndex==0) && (this.uploader.queue.length==0)){
      console.log("envío sin archivo")
      this.sessionService.signup(newUser).subscribe( 
        user => {
          this.router.navigate(['/']);
        },
        err => {
          this.error = err.message;
        }
      );
    }

    else{
      console.log("Envío con archivo")
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('username', newUser.username);
        form.append('password', newUser.password);
        form.append('name', newUser.name);
        form.append('surname', newUser.surname);
        form.append('email', newUser.email);
        console.log(form)
      };
  
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = () => {

      };
    }

  }

  login(knownUser) {
    this.sessionService
      .login(knownUser.username, knownUser.password)
      .subscribe(
        user => {
          this.router.navigate(['/']);
        },
        err => {
          this.error = err.message;
        }
      )
  }
}
