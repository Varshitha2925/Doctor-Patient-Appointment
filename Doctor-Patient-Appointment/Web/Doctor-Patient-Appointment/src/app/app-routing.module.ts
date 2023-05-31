import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },

  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: 'patient',
      loadChildren: () => import('./patient-dashboard/patient-dashboard.component').then(() => PatientDashboardComponent),
    }]
  }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
