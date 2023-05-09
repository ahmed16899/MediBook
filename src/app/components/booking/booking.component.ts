import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
import { environment } from 'api';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm:FormGroup;
  isLoaded:boolean;
 dayname:any;
 userinfo:any;
 DoctorsTimeSlot:any;
 DoctorsInfo:any;
 month:any;
    year:any;
  timeId:any;
  constructor(private route:ActivatedRoute ,private toastr: ToastrService , private http:HttpClient,private router:Router ,private auth:AuthService) { }

  ngOnInit(): void {
  

    this.auth.userdata.subscribe((value)=>{
      console.log("jjj",value)
      this.userinfo = value
      this.bookingForm=new FormGroup({
        'email':new FormControl(this.userinfo.email,Validators.required),
        'name':new FormControl(this.userinfo.name,Validators.required),
        'mobile':new FormControl(this.userinfo.mobilePhone,Validators.required),
      });
  })
    this.isLoaded=false;
    this.route.queryParams.subscribe(params =>{
      this.timeId=params['id'];
      this.getTimeSlots();
    });
  }
 
  getTimeSlots(){
    const httpOptions = {
      headers: new HttpHeaders({      
        'auth':localStorage.getItem('token')
      })
    };
    this.http.get(`${environment.ApiUrl}/gettimeslot/${this.timeId}`).pipe(map((res:any)=>{
      console.log(res);
     
      let {from,to,fullyBooked,bookingPrice,doctorId,_id}=res;
      to=new Date(to);
      from=new Date(from);
      this.dayname=from.toLocaleString('en-US',{weekday:'long'});
      this.month=from.toLocaleString('en-US',{month:'numeric'});
      this.year=from.toLocaleString('en-US',{year:'numeric'});
      let date=`${this.dayname}.${this.month}.${this.year}`;
      from=from.toLocaleTimeString();
      
      to=to.toLocaleTimeString();
      const {name,specification,clinicAddress,mobilePhone}=res;
    this.DoctorsInfo={name,specification,clinicAddress,mobilePhone};
      this.DoctorsTimeSlot={date,from,to,fullyBooked,bookingPrice};
      // this.getdoctorInfo(doctorId);

      return this.DoctorsTimeSlot;
    })).subscribe((res)=>{
      this.isLoaded=true;
        });
  }



  senddata()
  {
    const httpOptions = {
      headers: new HttpHeaders({      
        'auth':localStorage.getItem('token')
      })
    };
    const bookingobj={username:this.bookingForm.get('name').value};
    // const bookingobj={timeslotId:this.timeId,doctorMobilePhone:this.DoctorsInfo.mobilePhone,clinicAddress:this.DoctorsInfo.clinicAddress,Date:this.DoctorsTimeSlot.date,from:this.DoctorsTimeSlot.from,to:this.DoctorsTimeSlot.to,bookingPrice:this.DoctorsTimeSlot.bookingPrice,doctorId:this.DoctorsInfo.id,useremail:this.bookingForm.get('email').value,username:this.bookingForm.get('name').value,usermobile:this.bookingForm.get('mobile').value}
console.log("fiiin",bookingobj);
    this.http.post(`${environment.ApiUrl}/book/${this.timeId}`,bookingobj,httpOptions).subscribe(value=>{
      this.toastr.success('success', 'Booked Successfully');
      this.router.navigate(['/Thankyou'],{queryParams:{id:this.userinfo._id}});
    })
  }

  goToHome()
  {
    this.router.navigate(['home']);
  }

  
}
