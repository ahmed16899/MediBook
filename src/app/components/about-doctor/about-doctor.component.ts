import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'api';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-about-doctor',
  templateUrl: './about-doctor.component.html',
  styleUrls: ['./about-doctor.component.scss']
})
export class AboutDoctorComponent implements OnInit {
doctorId:any;
doctorInfo:any;
isLoaded:any;
userId:any;
isEnded:any;
username:any;
notification:any;
bookingId:any;
rateFormControll=new FormControl('',Validators.required);
message=new FormControl('');
  constructor(private route:ActivatedRoute , private toastr: ToastrService, private auth:AuthService,private http:HttpClient,private router:Router) { }
 
  
  ngOnInit(): void {
    this.isEnded=false;
    this.isLoaded=false;
    this.route.queryParams.subscribe((params)=>{
this.doctorId=params['id'];
this.bookingId=params['bookingId'];
 this.auth.userdata.subscribe((value:any)=>{
  this.userId=value._id;
  this.username=value.name;
})
this.getBookingsInfo();
this.getDoctorInfo()
    })
  }
  getBookingsInfo()
  {
    this.http.get(`${environment.ApiUrl}/booking/${this.bookingId}`).subscribe((res)=>{
      this.isEnded=res['booking'].ended;
      this.notification=res['booking'].doctorInstructions;
      // this.notification="Medication: Amoxicillin 500mg \
      // Dosage: Take 1 capsule by mouth three times per day for 10 days \
      // Refills: None Instructions: Take with food. Finish all medication as prescribed.";
      console.log(this.notification);
      
    })
  }
  getDoctorInfo()
  {
    this.http.get(`${environment.ApiUrl}/doctor/${this.doctorId}`).pipe(map((res:any)=>{
      let {name,mobilePhone,clinicAddress,imageUrl,specification,doctorRate}=res['doctor'];
      if(!imageUrl)imageUrl='assets/img/doctors/doctors-1.jpg';
this.doctorInfo={name,mobilePhone,clinicAddress,imageUrl,specification,doctorRate};
return res;
    })).subscribe(res=>this.isLoaded=true);
  }
  showTimeSlots()
  {
this.router.navigate(['/Availabletimes'],{queryParams:{id:this.doctorId}});

  }
  submitRating()
  {
    const httpOptions = {
      headers: new HttpHeaders({      
        'auth':localStorage.getItem('token')
      })
    };
    console.log("jjj",this.rateFormControll.value,this.username);
    this.http.post(`${environment.ApiUrl}/addRate/${this.doctorId}`,{username:this.username,rate:this.rateFormControll.value},httpOptions).subscribe((res:any)=>{
     if(res.message=="rating send successfully")this.toastr.success('success', res.message);
     else{
      this.toastr.error('failed', res.message);
     }
      console.log(res);
      this.rateFormControll.setValue('');
    });
    
  }
}
