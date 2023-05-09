import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'viewUsers', component: ViewUsersComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
