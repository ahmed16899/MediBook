import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../../service/patientservice.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.scss'],
})
export class PatientdashboardComponent implements OnInit {
  docNums: any[] = [];
  depReservations: any[] = [];
  depEarned: any[] = [];
  checkLoader: boolean = false;
  //ww:number=700
  cardColor: string = '#deaff0';

  view: [number, number] = [600, 370];

  // options
  legendTitle: string = 'Reservations';
  legendTitleMulti: string = 'Money';
  legendPosition: any = 'right'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Money Paid';
  xAxisLabel: string = 'Month';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = [
    'Genre 1',
    'Genre 2',
    'Genre 3',
    'Genre 4',
    'Genre 5',
    'Genre 6',
    'Genre 7',
  ];
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000];

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme: any = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F'],
    //domain: ['#6B8E23', '#8B4513', '#808080', '#696969', '#4DB76B'],
    //domain: ['#0074D9', '#1ECC40', '#FF4136', '#FF851B', '#B10DC9']
  };
  schemeType: any = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book'];
  barPadding: number = 5;
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;
  timeline: boolean = true;
  noData1: boolean = true;
  noData2: boolean = true;
  noData3: boolean = true;

  constructor(private _patientSer: PatientserviceService) {}
  ngOnInit(): void {
    forkJoin([
      this._patientSer.getUserDepartmentFrequency(),
      this._patientSer.getUserDoctorFrequency(),
      this._patientSer.getLast3MonthsRes(),
    ]).subscribe((res: any) => {
      console.log(res);

      if (res[1] != 'this user has no bookings') {
        this.docNums = res[1].userFrequency;
      } else {
        this.noData1 = false;
      }
      if (res[0] != 'this user has no bookings') {
        this.depReservations = res[0].userDeptFrequency;
      } else {
        this.noData2 = false;
      }

      if (res[2].DeptIncomes.length != 0) {
        this.depEarned = res[2].DeptIncomes;
      } else {
        this.noData3 = false;
      }

      this.checkLoader = true;
    });
    //this.UserDoctorFrequency();
    //this.UserDepartmentFrequency()
  }

  /*UserDoctorFrequency()
  {
    this._patientSer.getUserDoctorFrequency().subscribe((res)=>{
      console.log(res)
      this.docNums=res.userFrequency
    })
  }
  UserDepartmentFrequency()
  {
    this._patientSer.getUserDepartmentFrequency().subscribe((res)=>{
      console.log(res)
      this.depReservations=res.userDeptFrequency
      this.checkLoader=true
    })
  }*/

  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
  colorScheme2: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
}
