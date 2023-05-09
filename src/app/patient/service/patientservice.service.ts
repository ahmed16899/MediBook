import { Injectable } from '@angular/core';
import { environment } from '../../../../api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class PatientserviceService {
  id :string=''
  constructor(private _HttpClient: HttpClient, private _Router: Router ,   private _auth:AuthService) {
    let userData:any
    this._auth.userdata.subscribe(()=>{
      userData =this._auth.userdata.getValue();
      this.id=userData._id
    //this.username=userData.username;
    })
  }
  getUserDoctorFrequency(): Observable<any> {
    return this._HttpClient.get(`${environment.ApiUrl}/userDoctorsFrequency/${this.id}`);
  }
  getUserDepartmentFrequency(): Observable<any> {
    return this._HttpClient.get(`${environment.ApiUrl}/userDepartmentFrequency/${this.id}`);
  }
  getLast3MonthsRes(): Observable<any> {
    return this._HttpClient.get(`${environment.ApiUrl}/userdeptoutcomes/${this.id}`);
  }
}

