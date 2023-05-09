import { HttpClient } from '@angular/common/http';
import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'api';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-allappointments',
  templateUrl: './allappointments.component.html',
  styleUrls: ['./allappointments.component.scss']
})
export class AllappointmentsComponent implements OnInit  {
  isLoaded:any;
  userId:any='null';
  bookingInfo:any=[];
    constructor(private route:ActivatedRoute , private http:HttpClient,private router:Router,private auth:AuthService) { }
  
    async ngOnInit(): Promise<void> {
      this.isLoaded=false;
     await this.auth.userdata.subscribe((value:any)=>{
        this.userId=value._id;
        this.getuserBookingsInfo();
    })
    
        
    }
  
  
    getuserBookingsInfo()
    {
      if(!this.userId){
        this.router.navigate(['auth/signin'])
      };
      let bookingItem;
        this.http.get(`${environment.ApiUrl}/userbookings/${this.userId}`).pipe(map((res)=>{
        for(let key in res)
        {
          if(key=='userBookings')
          {
            for(let key2 in res[key])
            {
              bookingItem=res[key][key2]; 
              let {name,mobilePhone ,clinicAddress,specification,doctorId,doctorRate}=bookingItem.doctor;
              let {fees,_id}=bookingItem.booking;
              let {username}=bookingItem.user;
              let {from,to}=bookingItem.timeSlot;
          to=new Date(to);
          from=new Date(from);
          let dayname=from.toLocaleString('en-US',{day:'numeric'});
          let month=from.toLocaleString('en-US',{month:'numeric'});
          let year=from.toLocaleString('en-US',{year:'numeric'});
          from=from.toLocaleTimeString();
          to=to.toLocaleTimeString();
          let date=`${dayname}-${month}-${year} From ${from} to ${to}`; 
          this.bookingInfo.push({name,fees ,mobilePhone,date,clinicAddress,specification,doctorId,doctorRate,bookingId:_id});
            }
          
          }
        }
        console.log(this.bookingInfo , 'dddddddddddddd')
     return this.bookingInfo; 
      })).subscribe((res)=>{
        this.isLoaded=true;
        console.log("success",res);
          });
          
    }

    goToDoctorDetails(id,bookingId)
    {
      console.log("bookingId",bookingId);
      this.router.navigate(['/about-doctor'],{queryParams:{id,bookingId}});
    }

}
