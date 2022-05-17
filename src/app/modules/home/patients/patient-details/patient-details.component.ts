import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { Router } from '@angular/router';
import { Session } from 'src/app/shared/models/session.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  patientId: number;
  patientDetails: Patient;
  patientSessions: Session;
  currentSession: Session;

  faChevronCircleLeft = faChevronCircleLeft;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params.id;
    this.api.getPatient(this.patientId).subscribe((res) => {
      this.patientDetails = res.data;
    });
    this.api.getSessionsById(this.patientId).subscribe((res) => {
      this.patientSessions = res.data;
      console.log(this.patientSessions);
    });
  }

  diagnoseDetails(patientId: any): void {
    this.router.navigate(['/diagnose', patientId]);
  }

  sessionDetails(session: any): void {
    this.currentSession = session;
  }

  printPage(): void {
    window.print();
  }
}
