import { Component, OnInit } from '@angular/core';
// import { single } from './data';
import { AdminserviceService } from '../services/adminservice.service';
import { Observable } from 'rxjs/internal/Observable';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // options
  legendTitleDepartment: string = 'departments';
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabelDepartment: string = 'Bookings';
  xAxisLabelDepartment: string = 'Department';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  legendTitleDoctors: string = 'Doctors';

  yAxisLabelDoctors: string = 'Bookings';

  xAxisLabelDoctors: string = 'Doctors';

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
  yAxisTicks: any[] = [0, 4, 8, 12, 16, 20];
  testAxisTicks: any[] = [0.0, 4.0, 8.0, 12.0, 16.0, 20.0];

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  barPadding: number = 5;
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;
  checkLoader: boolean = false;

  ngOnInit(): void {
    /*this._adminService.getUsersCount().subscribe((res) => {
      this.usersCount = res;
      // console.log(res);
      // console.log(this.usersCount.numberOfClients);
    })
    this._adminService.getDoctorsMostRated().subscribe((res) => {
      console.log(res.doctors[0]);
      if (res.doctors) {
        for (let i = 0; i < res.doctors.length; i++) {
          let ratesValues = new Array(res.doctors[i].doctorRate)
          res.doctors[i].ratesValues = ratesValues;

        }
        this.doctorsMostRated = res.doctors;
      }
      else {

      }

    })
    this._adminService.getAllBookings().subscribe((res) => {
      console.log(res.bookings);
      this.allBookings = res.bookings
    })
    this._adminService.getDepartmentFrequency().subscribe((res) => {
      // console.log(res);
      this.deptFrequency = res.deptFrequency;
      console.log(this.deptFrequency);
    })
    this._adminService.getDoctorFrequency().subscribe((res) => {
      this.doctorFrequency = res.doctorFrequency
    })*/

    this.getAllData();
    this.getAllDoctors();
  }

  getAllData() {
    forkJoin([
      this._adminService.getUsersCount(),
      this._adminService.getDoctorsMostRated(),
      this._adminService.getAllBookings(),
      this._adminService.getDepartmentFrequency(),
      this._adminService.getDoctorFrequency(),
    ]).subscribe((res: any) => {
      this.usersCount = res[0];
      if (res[1].doctors) {
        for (let i = 0; i < res[1].doctors.length; i++) {

          console.log(i)

          //let ratesValues = Array(Math.ceil(res[1].doctors[i].doctorRate / 10)).fill(0).map((_, i) => i + 1);
          if(res[1].doctors[i].doctorRate)
          {
            let ratesValues = new Array(Math.ceil(res[1].doctors[i].doctorRate));
            res[1].doctors[i].ratesValues = ratesValues;
          }
          
          //const rating = Array(Math.ceil(res[1].doctors[i].doctorRate)).fill(0).map((_, i) => i + 1);
          //console.log(rating)
        }
        this.doctorsMostRated = res[1].doctors;
      }
      console.log(res[1])
      this.allBookings = res[2].bookings;
      this.length1 = Array(Math.ceil(this.allBookings.length / 10))
        .fill(0)
        .map((_, i) => i + 1);
      this.length2 = Array(Math.ceil(this.doctorsMostRated.length / 10))
        .fill(0)
        .map((_, i) => i + 1);
      this.deptFrequency = res[3].deptFrequency;
      this.doctorFrequency = res[4].doctorFrequency;
      this.checkLoader = true;
    });
  }

  getAllDoctors() {
    this._adminService.getAllDoctors().subscribe((res) => {
      this.allDoctors = [];
      for (let dr of res.allDoctorsData) {
        if (dr.status === 'pending') {
          this.allDoctors.push(dr);
        }
        // console.log(res.allDoctorsData)
      }
      this.length = Array(Math.ceil(this.allDoctors.length / 10))
        .fill(0)
        .map((_, i) => i + 1);
    });
  }
  openModal(certificate) {
    this.certificate = certificate;
  }

  updateDoctor(id: any, status: any) {
    this._adminService.updateDoctorDate(id, { status }).subscribe((res) => {
      console.log('success', res.doctor.status);
      this.getAllDoctors();
    });
  }

  certificate: string = '';
  usersCount: any;
  deptFrequency: any[];
  doctorsMostRated: any[];
  doctorFrequency: any[];
  allBookings: any[];
  allDoctors: any[] = [];
  single: any[];
  view: [number, number] = [700, 400];
  viewVertical: [number, number] = [600, 400];
  gradient: boolean = true;
  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  // };
  colorScheme: Color = {
    domain: ['#5691e4', '#A10A28', '#5AA454'],
    group: ScaleType.Ordinal,
    selectable: true,
    name: 'Customer Usage',
  };
  cardColor: string = 'rgba(0, 0, 0,1)';

  constructor(private _adminService: AdminserviceService) {
    _adminService.getUsers('').subscribe((data: any) => {
      const counts = {};
      data.users.forEach((user) => {
        counts[user.type] = (counts[user.type] || 0) + 1;
      });
      this.single = [
        {
          name: 'Admin',
          value: counts['admin'],
        },
        {
          name: 'Patient',
          value: counts['patient'],
        },
        {
          name: 'Doctor',
          value: counts['doctor'],
        },
      ];
    });
  }

  onSelect(event) {
    // console.log(event);
  }
  formatString(input: string): string {
    if (input) {
      return input.toUpperCase();
    }
    return '';
  }
  formatNumber(input: number): number {
    if (input) {
      return input;
    }
    return 0;
  }

  length: number[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number;
  get pagedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.allDoctors.slice(startIndex, startIndex + this.pageSize);
  }
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  length1: number[] = [];

  currentPage1: number = 1;
  pageSize1: number = 10;
  totalItems1: number;
  get pagedItems1() {
    const startIndex = (this.currentPage1 - 1) * this.pageSize1;
    return this.allBookings.slice(startIndex, startIndex + this.pageSize1);
  }
  setPage1(pageNumber: number) {
    this.currentPage1 = pageNumber;
  }

  length2: number[] = [];

  currentPage2: number = 1;
  pageSize2: number = 10;
  totalItems2: number;
  get pagedItems2() {
    const startIndex = (this.currentPage2 - 1) * this.pageSize2;
    return this.doctorsMostRated.slice(startIndex, startIndex + this.pageSize2);
  }
  setPage2(pageNumber: number) {
    this.currentPage2 = pageNumber;
  }
}
