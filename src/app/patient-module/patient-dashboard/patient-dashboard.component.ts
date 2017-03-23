import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import {CacheService, CacheStoragesEnum} from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  data: any =[];
  comments : any = [];
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  loadTestData: boolean = true;
  loadCommentData: boolean = true;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,private patientService: PatientService,
  private loginService:LoginService, public router: Router) { }

  ngOnInit() {
      this.session_id = this.loginService.getSessionId();
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.gettests]).subscribe(data => {
                this.loadTestData = false;
                console.log(data);
                this.data = data.results;
                this.data.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                this.data = this.data.slice(0, 6);
        });
      let  exists: boolean = this._cacheService.exists('dashboard-comments');
      if(exists){
        console.log("Data exist");
        this.loadCommentData = false;
        this.comments = this._cacheService.get('dashboard-comments');
      }else{
        this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getcomments]).subscribe(data => {
                  console.log(data);
                  this.loadCommentData = false;
                  this.comments = data.results;
                  this.comments.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                  this.comments = this.comments.slice(0, 8);
                  this._cacheService.set('dashboard-comments', this.comments, {maxAge: 10 * 60});
        });
      }
  }
  testOnclick(test_id:string,record_id?:string){
    if(record_id){
        this.router.navigate(['/patient/tests',test_id,record_id]);
    }else{
       this.router.navigate(['/patient/tests',test_id,"null"]);
    }
    
  }

}
