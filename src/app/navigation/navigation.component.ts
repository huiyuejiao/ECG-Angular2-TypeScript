import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['../bootstrap-custom.css', '../common.css','./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  patient: boolean = true;
  usercol: string;
  constructor() { }
  ngOnInit() {

  }

}
