import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientdashboardComponent } from './components/patientdashboard/patientdashboard.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';
import { HttpLoaderFactory } from '../app.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PatientComponent,
    PatientdashboardComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
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
    MatProgressSpinnerModule
  ]
})
export class PatientModule { }
