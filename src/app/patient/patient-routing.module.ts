import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { PatientdashboardComponent } from './components/patientdashboard/patientdashboard.component';

const routes: Routes = [{ path: '', component: PatientComponent },
{ path: 'dashboard', component: PatientdashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
