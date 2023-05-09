import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-availabletimes',
  templateUrl: './availabletimes.component.html',
  styleUrls: ['./availabletimes.component.scss'],
})
export class AvailabletimesComponent implements OnInit {
  isLoaded: boolean;
  disabled: boolean = false;
  dayname: any;
  month: any;
  year: any;
  doctorId: any;
  DoctorsTimeSlots: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private _auth: AuthService
  ) {}
  type: string = '';
  ngOnInit(): void {
    this.isLoaded = false;

    this._auth.userType.subscribe((res) => {
      this.type = res;
    });

    this.route.queryParams.subscribe((params) => {
      this.doctorId = params['id'];
      this.getAllTimeSlots();
    });
  }
  getAllTimeSlots() {
    console.log(this.doctorId);
    this.http
      .get(`${environment.ApiUrl}/doctorTimeSlots/${this.doctorId}`)
      .pipe(
        map((res) => {

          if (res != 'this doctor has no timeSlots')
          {
            console.log(res)
          this.DoctorsTimeSlots = [];
          for (let key in res) {
            this.disabled = false;
            let { from, to, fullyBooked, _id } = res[key];
            to = new Date(to);
            from = new Date(from);
            if (Date.now() > from) {
              console.log('test', this.disabled);
              this.disabled = true;
            }
            this.dayname = from.toLocaleString('en-US', { day: 'numeric' });
            this.month = from.toLocaleString('en-US', { month: 'numeric' });
            this.year = from.toLocaleString('en-US', { year: 'numeric' });
            let date = `${this.dayname}-${this.month}-${this.year}`;
            from = from.toLocaleTimeString();

            to = to.toLocaleTimeString();
            this.DoctorsTimeSlots.push({
              date,
              from,
              to,
              fullyBooked,
              _id,
              disabled: this.disabled,
            });
          }
          //this.DoctorsTimeSlots.sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.from < b.from) ? 1 : -1) : -1 )
          console.log(this.DoctorsTimeSlots);
          if(this.DoctorsTimeSlots.length)
          {
            this.length = Array(Math.ceil(this.DoctorsTimeSlots.length / 4))
            .fill(0)
            .map((_, i) => i + 1);
          }
          
          this.DoctorsTimeSlots.reverse();
          console.log(this.DoctorsTimeSlots)
          return this.DoctorsTimeSlots;
          }
          else
          {
            return this.DoctorsTimeSlots;
          }
        })
      )
      .subscribe((res) => {
        console.log(res)
        if(res)
        {
          this.checkDataisHere = true
        }
        this.isLoaded = true;
      });
  }

  book(id: any) {
    if (this.type == 'null') {
      this.router.navigate(['auth/signin']);
    } else {
      this.router.navigate(['/booking'], { queryParams: { id } });
    }
  }

  length: number[] = [];

  currentPage: number = 1;
  pageSize: number = 4;
  totalItems: number;
  get pagedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    if(this.DoctorsTimeSlots.length != 0)
    {
      return this.DoctorsTimeSlots.slice(startIndex, startIndex + this.pageSize);
    }
  }
  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  checkDataisHere:boolean=false
}
