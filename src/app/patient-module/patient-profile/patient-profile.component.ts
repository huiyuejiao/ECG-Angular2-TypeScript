import { Component, OnInit } from '@angular/core';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  session_id: string;
  userid: number;
  usercol: string;
  result: any;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private patientService: PatientService,private loginService: LoginService) { }

  ngOnInit() {
      let  exists: boolean = this._cacheService.exists('profile');
      if(exists){
          console.log("profile Data exist");
          this.result = this._cacheService.get('profile');
      }else{
          this.session_id = this.loginService.getSessionId();
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.patientService.getInfo(this.usercol, this.userid, this.session_id).subscribe(data => {
                  console.log(data);
                  this.result = data;
                  this._cacheService.set('profile', this.result, {maxAge: 10 * 60});
          });
      }
  }

}
