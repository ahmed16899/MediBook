import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorserviceService } from '../../services/doctorservice.service';

@Component({
  selector: 'app-timeslotappointment',
  templateUrl: './timeslotappointment.component.html',
  styleUrls: ['./timeslotappointment.component.scss']
})
export class TimeslotappointmentComponent implements OnInit {
doctorId:any;
timeId:any;
isLoaded:any;
date:any;
patients:any=[];
noData:boolean=true

  constructor(private route: ActivatedRoute,private doctorSer: DoctorserviceService,private router: Router) { }
  
  ngOnInit(): void {
    this.isLoaded=false;
    this.route.queryParams.subscribe(params => {
      this.doctorId = params['docId'];
      this.timeId = params['id'];
      this.doctorSer.getAppointmets(this.timeId,this.doctorId).subscribe(res=>{
        if(res.message != "this time slot has not bookings")
        {
          console.log("shit",res);
          let {from,to}=res;
            to=new Date(to);
            from=new Date(from);
            let dayname=from.toLocaleString('en-US',{weekday:'long'});
            let month=from.toLocaleString('en-US',{month:'numeric'});
            let year=from.toLocaleString('en-US',{year:'numeric'});
            from=from.toLocaleTimeString();
            to=to.toLocaleTimeString();
            let date=`${dayname}.${month}.${year} From ${from} to ${to}`; 
            this.date=date;
          for(let key in res['timeSlotBookings'])
          {
            let user=res['timeSlotBookings'][key].user;
            user.bookingId=res['timeSlotBookings'][key]._id;
            this.patients.push(user);
          }
          console.log("jjjo",this.patients);
        }
        else
        {
          this.noData = false
        }
     
        this.isLoaded=true;
      })
      
    });
  }

  goToPatient(patientid,bookingId){
    this.router.navigate(['/doctor/patient'],{queryParams:{id:patientid,timeId:bookingId}});
  }

}
