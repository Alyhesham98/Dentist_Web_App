import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { DiseasesDetailsComponent } from './modules/home/diseases/diseases-details/diseases-details.component';
import { DiseasesComponent } from './modules/home/diseases/diseases.component';
import { HomeComponent } from './modules/home/home.component';
import { InventoryComponent } from './modules/home/inventory/inventory.component';
import { PatientDetailsComponent } from './modules/home/patients/patient-details/patient-details.component';
import { PatientsComponent } from './modules/home/patients/patients.component';
import { PageNotFoundComponent } from './shared/errors/page-not-found/page-not-found.component';
import { DiagnoseComponent } from './modules/home/diagnose/diagnose.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'diseases',
        component: DiseasesComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {path: 'patientDetails/:id', component: PatientDetailsComponent },
  {path: 'diseaseDetails/:id', component: DiseasesDetailsComponent },
  {path: 'diagnose/:id', component: DiagnoseComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
