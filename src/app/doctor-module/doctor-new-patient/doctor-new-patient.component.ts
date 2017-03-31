import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../shared/services/doctor.service';
import { LoginService } from '../../shared/services/login.service';
import { Methods } from '../../shared/data/method-enum';
import { CookieService } from 'angular2-cookie/core'
@Component({
  selector: 'app-doctor-new-patient',
  templateUrl: './doctor-new-patient.component.html',
  styleUrls: ['../../bootstrap-custom.css', '../../common.css','../../patient-module/patient-comments/patient-comments.component.css','./doctor-new-patient.component.css']
})
export class DoctorNewPatientComponent implements OnInit {
  data: any =[];
  session_id: string;
  userid: number;
  usercol: string;
  loadCommentData:boolean = true;
  constructor(private cookieService:CookieService,private doctorService: DoctorService,
  private loginSrvice:LoginService) { }

  ngOnInit() {
    this.session_id = this.loginSrvice.getSessionId();
    this.userid = JSON.parse(this.cookieService.get("user_info")).userid;
    this.usercol = JSON.parse(this.cookieService.get("user_info")).usercol;
  }
  onReset(searchForm){
      searchForm.name.value =  "";
  }
  onSearch(serachform){
      console.log(serachform);
      this.doctorService.searchPatients(this.usercol, this.userid, this.session_id, serachform.name).subscribe(data =>{
            console.log(data);
            this.data = data.results;
            this.loadCommentData = false;
      })
 }
}
