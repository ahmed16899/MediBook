import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { AddslotComponent } from './components/addslot/addslot.component';
import { GetslotsComponent } from './components/getslots/getslots.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpLoaderFactory } from '../app.module';
import { NgbDatepicker, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DoctordashboardComponent } from './components/doctordashboard/doctordashboard.component';
import { TimeslotappointmentComponent } from './components/timeslotappointment/timeslotappointment.component';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';

@NgModule({
  declarations: [
    DoctorComponent,
    AddslotComponent,
    GetslotsComponent,
    DoctordashboardComponent,
    TimeslotappointmentComponent,
    SendNotificationComponent,
    UserhistoryComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbDatepicker,
    NgbDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    // MatTimepickerModule,
    NgxMatTimepickerModule,
    MatProgressSpinnerModule,
  ]
})
export class DoctorModule { }
