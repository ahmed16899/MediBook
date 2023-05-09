import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DoctorserviceService } from '../../services/doctorservice.service';

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.scss']
})
export class DoctordashboardComponent implements OnInit {
  checkLoader:boolean = false


patientGenders:any=[]
doctorInfo:any={}
doctorRating:any=[]
reservations:number=0
maxReservations:number=0
timeSlots:any=[]
doctorIncomes:any=[]
//ww:number=700

  view: [number , number] = [600, 370];

  // options
  units: string = 'Reservations';
  legendTitle: string = 'TimeSlots';
  legendTitleMulti: string = 'Money';
  legendPosition: any = 'right'; // ['right', 'below']
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yAxisLabel: string = 'Money Earned';
  xAxisLabel: string = 'Day';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;
  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000]
  animations: boolean = true; // animations on load
  showGridLines: boolean = true; // grid lines
  showDataLabel: boolean = true; // numbers on bars
  gradient: boolean = false;
  colorScheme:any = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'
  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;
  yScaleMax: number = 9000;
  roundEdges: boolean = false;
  timeline: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  constructor(private _doctorService:DoctorserviceService) { Object.assign(this, this.timeSlots ); }
  ngOnInit(): void {


  this.getDoctorTimeSlots()
  this.getDoctorIncomes()
  this.getDoctorByID()
  this.getDoctorBookings()
  // console.log("ss",this.doctorIncomes)
  }

getDoctorTimeSlots(){
  let timeSlots:any=[]
  let obj:any={}
  this._doctorService.getDoctorTimeSlots().subscribe(data=>{
    console.log(data)
    if(data != 'this doctor has no timeSlots')
    {
      timeSlots=data
      for(let timeSlot of timeSlots){
        this.getDoctorReservations(timeSlot)
        if (timeSlot.reservations>0){
        obj={name:timeSlot.date.slice(0,10),series:[{
          name:`${timeSlot.from.slice(11,16)}-${timeSlot.to.slice(11,16)}`,
          value:timeSlot.reservations
        }]}
        this.timeSlots.push(obj)
      }}
    }
   
    //this.checkLoader=true
  })
}

getDoctorReservations(obj){
  this.reservations+=obj.reservations
  this.maxReservations+=obj.maxReservations
}

getDoctorIncomes(){
  let obj:any={}
  this._doctorService.getDoctorIncomes().subscribe(data=>{
    console.log(data)
    if(data.message != "this doctor has no time Slots")
    {
      for(let i of data.doctorIncomes){
        if(i.income>0){
          obj={name:i.timeSlot.date.slice(0,10),value:i.income}
          this.doctorIncomes.push(obj)
        }
        // else{
        //   obj={
        //     name:'',value:0
        //   }
        // }
      }
    }
    
    // console.log(this.doctorIncomes)
  })
}
getDoctorByID(){

  this._doctorService.getDoctorByID().subscribe(data=>{
    this.doctorInfo=data.doctor
    this.doctorRating=new Array(Math.ceil( data.doctor.doctorRate))
  })
}
getDoctorBookings(){
  let mCounter:number = 0
  let fCounter:number = 0
  this._doctorService.getDoctorBookings().subscribe(data=>{
    console.log(data)
    this.checkLoader=true

    if(data.message != "this doctor has no timeSlots")
    {
      for(let booking of data.doctorBookings){
        if(booking.patient.gender=="male"){
          mCounter++;
        }
        else if(booking.patient.gender=="female"){
          fCounter++;
        }
      }
    this.patientGenders=[{name:'Male',value:mCounter},{name:'Female',value:fCounter}]

    }
})
}



  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
