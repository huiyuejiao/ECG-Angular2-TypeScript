import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoginService } from './shared/services/login.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./bootstrap-custom.css', './common.css', './app.component.css']
})
export class AppComponent implements OnInit{
  constructor( public toastr: ToastsManager, vcr: ViewContainerRef, private loginService: LoginService){
        this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit(){
  }
}
