import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorserviceService } from '../../services/doctorservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {
  patientId:any;
  timeId:any;
  comments=new FormControl('', Validators.required);
  constructor(private route: ActivatedRoute,private doctorSer: DoctorserviceService,private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['id'];
      this.timeId = params['timeId'];
    })
  }
  sendNotification(e:Event)
  {
e.preventDefault();
const notification={
username:this.doctorSer.username,
doctorInstructions:this.comments.value
}
this.doctorSer.setinstruction(this.timeId,notification).subscribe((res)=>{
 console.log(res);
});

this.doctorSer.setNotification(this.timeId,notification).subscribe((res)=>{
  this.toastr.success('success', 'Prescription Sended Successfully');
  this.router.navigate(['/doctor/getslots']);
});

  }

}
