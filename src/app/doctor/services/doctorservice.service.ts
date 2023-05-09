import { Injectable } from '@angular/core';
import { environment } from '../../../../api'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {
  id:string=''
  username:string=''
  header:any =new HttpHeaders().set("auth",localStorage.getItem('token'));

  constructor(private _HttpClient:HttpClient 
    , private _Router:Router
    , private _auth:AuthService) { 
      let userData:any

      this._auth.userdata.subscribe(()=>{
        userData =this._auth.userdata.getValue();
        this.id=userData._id
      this.username=userData.username;
      })
      
      

      console.log(userData );



    }

    // getDoctorInfo():Observable<any>{
    //   const httpOptions = {
    //     headers: new HttpHeaders({      
    //       'auth':localStorage.getItem('token')
    //     })
    //   };
    //   console.log( this._HttpClient.get(`${environment.ApiUrl}/doctortimeslots/${this.id}`,httpOptions));
    //   return this._HttpClient.get(`${environment.ApiUrl}/doctortimeslots/${this.id}`,httpOptions);
    // }

    addSlot(slots:any):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.post(`${environment.ApiUrl}/createtimeslots/${this.id}`,slots,httpOptions);
    }
    getAllSlots():Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/doctortimeslots/${this.id}`,httpOptions);
    }
    getDoctorTimeSlots():Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      // return this._HttpClient.get(`${environment.ApiUrl}/doctorTimeSlots/${this.id}`,httpOptions)
      return this._HttpClient.get(`${environment.ApiUrl}/doctorTimeSlots/${this.id}`,httpOptions)

    }
    getDoctorIncomes():Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/getdoctorincomes/${this.id}`,httpOptions)
    }
    getAppointmets(timeId,docId):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/getTimeSlotBookings/${docId}/${timeId}`,httpOptions);
    }
    getDoctorBookings():Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/getdoctorbookings/${this.id}`,httpOptions)
    }
    getDoctorByID():Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/doctor/${this.id}`,httpOptions)
    }

    setNotification(id,body):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.patch(`${environment.ApiUrl}/endBooking/${id}`,body,httpOptions)
    }
    setinstruction(id,body):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.patch(`${environment.ApiUrl}/addDoctorInstructions/${id}`,body,httpOptions)
    }


    getPatientHistory(id:any):Observable<any>
    {
      const httpOptions = {
        headers: new HttpHeaders({      
          'auth':localStorage.getItem('token')
        })
      };
      return this._HttpClient.get(`${environment.ApiUrl}/patientHistory/${id}`,httpOptions)
    }  
}
