import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { SearchService } from '../../shared/services/search.service';
import { CookieService } from 'angular2-cookie/core';
import { CacheService } from 'ng2-cache/ng2-cache';
import { Methods } from '../../shared/data/method-enum';

@Component({
  selector: 'app-doctor-tests',
  templateUrl: './doctor-tests.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-tests/patient-tests.component.css','./doctor-tests.component.css']
})
export class DoctorTestsComponent implements OnInit {
  data: any =[];
  patients: any;
  session_id: string;
  userid: number;
  usercol: string;
  loadTestData: boolean = true;
  constructor(private _cacheService: CacheService,private cookieService:CookieService,
  private doctorService: DoctorService,private loginService:LoginService,
  private searchService:SearchService,public router: Router) { }

  ngOnInit() {
      this.session_id = this.loginService.getSessionId();
      this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
      this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
      let  exists: boolean = this._cacheService.exists('doctor-tests');
      if(exists){
          console.log("doctor-tests exist");
          this.loadTestData = false;
          this.data = this._cacheService.get('doctor-tests');
      }else{
          this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.gettests]).subscribe(data => {
                    console.log(data);
                    this.loadTestData = false;
                    this.data = data.results;
                    this.data.sort(function (a, b) { return new Date(b.created).getTime() - new Date(a.created).getTime(); });
                    this._cacheService.set('doctor-tests', this.data, {maxAge: 10 * 60});
          }); 
      }
      this.doctorService.getData(this.usercol, this.userid, this.session_id, Methods[Methods.getpatients]).subscribe(data => {
                this.patients = data.results;    
      }); 
  }
  testOnclick(test_id){
      console.log(test_id);
      this.router.navigate(['/doctor/tests',test_id,"null"]);
  }
  onSearch(searchform){
      console.log(searchform);
      this.searchService.getTests(this.session_id,this.userid.toString(),searchform.from,searchform.to,searchform.comment,searchform.note).subscribe(data =>{
          console.log(data);
          this.data = data.results;

     })
  }
  onChange(patient){
    console.log(patient);
  }
  onReset(searchForm){
      searchForm.from.value = searchForm.to.value = "";
  }

}
