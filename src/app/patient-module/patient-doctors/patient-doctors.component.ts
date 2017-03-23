import { Component, OnInit } from '@angular/core';
import { DataTableModule } from 'angular2-datatable';
import { PatientService } from '../../shared/services/patient.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { SearchBoxComponent } from '../../search-box/search-box.component';
@Component({
  selector: 'app-patient-doctors',
  templateUrl: './patient-doctors.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','./patient-doctors.component.css']
})
export class PatientDoctorsComponent implements OnInit {
  data: any =[];
  session_id: string;
  userid: number;
  usercol: string;
  method: string;
  keyword: string;
  loadDoctors: boolean = true;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private patientService: PatientService,private loginService: LoginService) { }

  ngOnInit() {
      let  exists: boolean = this._cacheService.exists('doctors');
      if(exists){
          console.log(" doctors Data exist");
          this.loadDoctors = false;
          this.data = this._cacheService.get('doctors');
      }else{
          this.session_id = this.loginService.getSessionId();
          this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
          this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
          this.method = Methods[Methods.getnotes];
          this.patientService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getdoctors]).subscribe(data => {
                  console.log(data);
                  this.loadDoctors = false;
                  this.data = data.results;
                  this._cacheService.set('doctors', this.data, {maxAge: 10 * 60});

           });  
      }  
  }
  updateHandler(value){
    this.keyword = value;
  }
}
