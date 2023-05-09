import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { AddslotComponent } from './components/addslot/addslot.component';
import { GetslotsComponent } from './components/getslots/getslots.component';
import { DocdashComponent } from './components/docdash/docdash.component';
import { DoctordashboardComponent } from './components/doctordashboard/doctordashboard.component';
import { TimeslotappointmentComponent } from './components/timeslotappointment/timeslotappointment.component';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';
import { UserhistoryComponent } from './components/userhistory/userhistory.component';
const routes: Routes = [{ path: '', component: DoctorComponent },
{ path: 'addslot', component: AddslotComponent },
{ path: 'dashboard', component: DoctordashboardComponent },
{ path: 'slotappointments', component: TimeslotappointmentComponent },
{ path: 'patient', component: SendNotificationComponent },
{ path: 'getslots', component: GetslotsComponent },
{ path: 'history/:id', component: UserhistoryComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
