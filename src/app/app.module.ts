import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/home/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { PatientsComponent } from './modules/home/patients/patients.component';
import { HomeComponent } from './modules/home/home.component';
import { PageNotFoundComponent } from './shared/errors/page-not-found/page-not-found.component';
import { DiseasesComponent } from './modules/home/diseases/diseases.component';
import { InventoryComponent } from './modules/home/inventory/inventory.component';
import { HeaderComponent } from './modules/header/header.component';
import { PatientDetailsComponent } from './modules/home/patients/patient-details/patient-details.component';
import { DiseasesDetailsComponent } from './modules/home/diseases/diseases-details/diseases-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from './services/api.service';
import { DiagnoseComponent } from './modules/home/diagnose/diagnose.component';
import { SearchfilterPipe } from './searchfilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    PatientsComponent,
    PageNotFoundComponent,
    HomeComponent,
    DiseasesComponent,
    InventoryComponent,
    HeaderComponent,
    PatientDetailsComponent,
    DiseasesDetailsComponent,
    DiagnoseComponent,
    SearchfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule,
    HttpClientModule,
    ScheduleModule,
    ButtonModule,
    FontAwesomeModule
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    ApiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
