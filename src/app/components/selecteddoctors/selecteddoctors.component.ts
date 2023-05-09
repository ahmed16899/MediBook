import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'api';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-selecteddoctors',
  templateUrl: './selecteddoctors.component.html',
  styleUrls: ['./selecteddoctors.component.scss'],
})
export class SelecteddoctorsComponent implements OnInit {
  department: string;
  address: string;
  isLoaded: boolean;
  doctors: string;
  doctorid: any;
  Doctorsinformations = [];
  checkLoader: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.department = params['department'] ? params['department'] : null;
      this.address = params['address'] ? params['address'] : null;
      this.doctors = params['doctor'] ? params['doctor'] : null;
      this.postAppointment({
        doctors: this.doctors,
        address: this.address,
        department: this.department,
      });
    });
  }

  postAppointment(appointment: {
    department: string;
    doctors: string;
    address: string;
  }) {
    this.isLoaded = false;
    // ${environment.ApiUrl}/doctorTimeSlots/
    const httpOptions = {
      headers: new HttpHeaders({
        auth: localStorage.getItem('token'),
      }),
    };
    this.http
      .get(`${environment.ApiUrl}/alldoctors`)
      .pipe(
        map((res) => {
          this.Doctorsinformations = [];
          for (const key in res) {
            if (key == 'allDoctorsData') {
              for (const key2 in res[key]) {
                if (
                  res[key][key2].specification == appointment.department ||
                  res[key][key2].clinicAddress == appointment.address ||
                  this.doctors == res[key][key2].name
                ) {
                  this.Doctorsinformations.push(res[key][key2]);
                }
              }
              if (this.Doctorsinformations.length == 0) {
                this.Doctorsinformations.push(...res[key]);
              }
              break;
            }
          }
          console.log(this.Doctorsinformations);
          this.length = Array(Math.ceil(this.Doctorsinformations.length / 4))
            .fill(0)
            .map((_, i) => i + 1);

          return this.Doctorsinformations;
        })
      )
      .subscribe((res) => {
        this.isLoaded = true;
      });
  }

  showTimeSlots(id: any) {
    this.doctorid = id;
    this.router.navigate(['/Availabletimes'], {
      queryParams: { id: this.doctorid },
    });
  }

  length: number[] = [];

  currentPage: number = 1;
  pageSize: number = 4;
  totalItems: number;
  get pagedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.Doctorsinformations.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  // goToDoctorDetails(id)
  // {
  //   this.router.navigate(['/about-doctor'],{queryParams:{id}});
  // }
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
