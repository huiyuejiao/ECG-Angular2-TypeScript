import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router }  from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  patient: boolean = true;
  usercol:string;
  constructor(private cookieService:CookieService,private loginService: LoginService, public router: Router) { }
  ngOnInit() {

  }

}
