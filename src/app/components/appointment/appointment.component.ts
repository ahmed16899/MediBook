import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorserviceService } from 'src/app/doctor/services/doctorservice.service';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
appointmentForm:FormGroup;
departmentsarray:string[]=[]
addressarray:string[]=[];

  constructor(private http:HttpClient, private route:ActivatedRoute,private router:Router , private auth :AuthService ) { }

  ngOnInit(): void {
    //console.log(this.auth.addressarray)
    this.addressarray = this.auth.addressarray
    this.departmentsarray = this.auth.departmentsarray

    this.appointmentForm=new FormGroup({
      'date':new FormControl(null),
      'address':new FormControl(""),
      'department':new FormControl(""),
      'doctor':new FormControl(null)
    });
  }

 

  onBooking():void {
    this.router.navigate(['/bookingdoc'],{queryParams:{address:this.appointmentForm.get('address').value,department:this.appointmentForm.get('department').value,doctor:this.appointmentForm.get('doctor').value}});
    

  }

}
