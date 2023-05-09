import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userType = new BehaviorSubject("null");
  userdata=new BehaviorSubject("null");
  departmentsarray:string[]=["General Medicine","Occupational Therapy","Radiology","Laboratory","Speech Therapy","Infectious Diseases","Physical Therapy","Psychiatry","Oncology","Rheumatology","Hematology","Endocrinology","Pediatrics","Obstetrics and Gynecology","Dermatology","Cardiology","Neurology","Ophthalmology","Pulmonary Medicine","Gastroenterology"]
  addressarray:string[]=["Cairo","Alexandria","El Arish","Damanhur","Kafr El Sheikh","Marsa Matruh","Hurghada","Sohag","Asyut","Zagazig","Damietta","Aswan","Tanta","Giza","Shubra El-Kheima","Port Said","Suez","Luxor","Mansoura","El-Mahalla El-Kubra"];

  constructor(private _HttpClient:HttpClient 
    , private _Router:Router) 
    {
      if(localStorage.getItem('userData'))
      {
        this.setUserData();
      }
      console.log(environment.ApiUrl)
      //console.log("asdasdasd")
  }
  register(registerData:any):Observable<any>
  {
    return this._HttpClient.post(`${environment.ApiUrl}/signup`,registerData);
  }
  login(loginData:any):Observable<any>
  {
    return this._HttpClient.post(`${environment.ApiUrl}/signin`,loginData);
  }
  setUserData()
  {
    //const token = ;
    const userData:any =JSON.parse(localStorage.getItem('userData'));
    this.userType.next(userData.type);
    this.userdata.next(userData);
    //return userData ;*/
  }
  logOut()
  {
   localStorage.removeItem('userData')
   localStorage.removeItem('token')

    this.userType.next("null");
    this.userdata.next("null");

    this._Router.navigate(['auth/signin']);
  }
}
