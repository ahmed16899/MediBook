import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorserviceService } from '../../services/doctorservice.service';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.scss']
})
export class UserhistoryComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _docSer:DoctorserviceService) { }
  isLoaded:boolean = false
  patientName:string = ''
  doctors:any[]=[]
  ngOnInit(): void {
   this.getPatientHistory()
  }

  getPatientHistory()
  {
    this._docSer.getPatientHistory(this._ActivatedRoute.snapshot.params['id']).subscribe((res)=>{
      console.log(res)
      this.patientName = res.patient.name
      this.doctors = res.history
      this.isLoaded = true
    })
  }

}
