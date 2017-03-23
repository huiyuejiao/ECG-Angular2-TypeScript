import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  lat: number = 48.463407;
  lng: number = -123.311693;
  loggedInUser: string;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem("user_info")));
    if(this.loginService.isLoggedIn == true){
        this.loggedInUser = this.loginService.loggedInUser;
    }else{
          this.loggedInUser ="";
    }
  }

}
