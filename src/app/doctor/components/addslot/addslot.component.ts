import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorserviceService } from '../../services/doctorservice.service';

@Component({
  selector: 'app-addslot',
  templateUrl: './addslot.component.html',
  styleUrls: ['./addslot.component.scss']
})
export class AddslotComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  slots: FormGroup = new FormGroup({
    holidays: new FormControl([], [ /*Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    fromDate: new FormControl(null, [Validators.required,/* Validators.minLength(6)*/]),
    toDate: new FormControl(null, [Validators.required, /*Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    from: new FormControl(null, [Validators.required,/* Validators.minLength(6)*/]),
    to: new FormControl(null, [Validators.required, /*Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    maxReservations: new FormControl(null, [Validators.required,/* Validators.minLength(6)*/]),
    bookingPrice: new FormControl(null, [Validators.required,/* Validators.minLength(6)*/]),
  })







  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private toastr: ToastrService, private doctorSer: DoctorserviceService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.slots.controls['fromDate']?.setValue(`${this.fromDate.year}-${this.changeNumber(this.fromDate.month)}-${this.changeNumber(this.fromDate.day)}`)
    this.slots.controls['toDate']?.setValue(`${this.toDate.year}-${this.changeNumber(this.toDate.month)}-${this.changeNumber(this.toDate.day)}`)
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  printDate() {
    console.log(this.fromDate, this.toDate)
  }
  ngOnInit(): void {
  }



  //time picker 
  defaultValue = { hour: 13, minute: 30 };

  timeChangeHandler(event: any) {
    console.log(event)
  }

  invalidInputHandler() { }

  printTime(value) {
    console.log(value)
  }
  printTime2(value) {
    console.log(value)
  }

  ///// holiday
  model: NgbDateStruct;
  date: { year: number; month: number };
  allHolidays: any[] = []
  handleHolidays() {
    this.allHolidays.push(`${this.model.year}-${this.changeNumber(this.model.month)}-${this.changeNumber(this.model.day)}`)
    this.slots.controls['holidays']?.setValue(this.allHolidays)
  }
  deleteHoliday(i: number) {
    this.allHolidays.splice(i, 1)
  }

  submitForm() {


    this.slots.controls['fromDate']?.setValue(`${this.fromDate.year}-${this.changeNumber(this.fromDate.month)}-${this.changeNumber(this.fromDate.day)}`)
    this.slots.controls['toDate']?.setValue(`${this.toDate.year}-${this.changeNumber(this.toDate.month)}-${this.changeNumber(this.toDate.day)}`)
    this.slots.controls['from'].setValue(this.slots.controls['fromDate'].value + 'T' + this.convertTo24Hour(this.slots.controls['from'].value))
    this.slots.controls['to'].setValue(this.slots.controls['fromDate'].value + 'T' + this.convertTo24Hour(this.slots.controls['to'].value))

    console.log(this.slots.value)

    this.doctorSer.addSlot(this.slots.value).subscribe((res) => {
      console.log(res)
      if (res.message == "schedule created successfully") {
        this.toastr.success('added', res.message)
      }
      else {
        this.toastr.error('added', res.message)
      }
    })
  }

  convertTo24Hour(time) {
    const [hours, minutes, meridian] = time.match(/(\d{1,2}):(\d{2}) ([AaPp][Mm])/).slice(1);
    const isPM = meridian.toLowerCase() === 'pm';
    let hours24 = parseInt(hours, 10);
    if (hours24 === 12) {
      hours24 -= 12;
    }
    if (isPM) {
      hours24 += 12;
    }
    return `${hours24.toString().padStart(2, '0')}:${minutes}`;
  }

  changeNumber(num) {
    let changed = "0"
    if (num < 10 && num > 0) 
    {
      changed += num
      return changed
    }
    else
    {
      return num  
    }
   
  }

}
