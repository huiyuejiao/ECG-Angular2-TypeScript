import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
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
