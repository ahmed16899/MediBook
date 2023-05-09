import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorGuard } from './shared/guards/doctor.guard';
import { PatientGuard } from './shared/guards/patient.guard';
import { AvailabletimesComponent } from './components/availabletimes/availabletimes.component';
import { SelecteddoctorsComponent } from './components/selecteddoctors/selecteddoctors.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { BookingComponent } from './components/booking/booking.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AllappointmentsComponent } from './components/allappointments/allappointments.component';
import { AboutDoctorComponent } from './components/about-doctor/about-doctor.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'doctor', canActivate: [DoctorGuard], loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  { path: 'patient', canActivate: [PatientGuard], loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },

  { path: 'bookingdoc', component: SelecteddoctorsComponent },
  { path: 'Availabletimes', component: AvailabletimesComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'All-appointments', component: AllappointmentsComponent },
  { path: 'Thankyou', component: ThankyouComponent },
  { path: 'about-doctor', component: AboutDoctorComponent },
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
