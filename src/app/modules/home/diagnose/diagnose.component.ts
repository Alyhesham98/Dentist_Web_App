import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { Disease } from 'src/app/shared/models/disease.model';
import { Session } from 'src/app/shared/models/session.model';
import { SubDisease } from 'src/app/shared/models/sub-disease.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css'],
})
export class DiagnoseComponent implements OnInit {
  sessionForm: FormGroup;
  toothClicked = false;

  sessionModel: Session = new Session();
  allDiseases: Disease[];
  selectedSubDiseases: SubDisease[];
  allDoctors: User[];

  faChevronCircleLeft = faChevronCircleLeft;
  patientId: number;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res) => {
      this.allDoctors = res.filter((user) => user.role === 'doctor');
    });

    this.api.getAllDiseaseName().subscribe((res) => {
      this.allDiseases = res.data;
    });

    this.patientId = this.route.snapshot.params.id;

    this.sessionForm = new FormGroup({
      toothName: new FormControl(null, [Validators.required]),
      doctorName: new FormControl(null, [Validators.required]),
      diseaseId: new FormControl(null, [Validators.required]),
      subDiseaseId: new FormControl(null, [Validators.required]),
      medicine: new FormControl(null, [Validators.required]),
      notes: new FormControl(null),
    });
  }

  onSubmit(): void {
    this.sessionModel = new Session();

    this.sessionModel.numberOfTeeth = this.sessionForm.value.toothName;
    this.sessionModel.doctorName = this.sessionForm.value.doctorName;
    this.sessionModel.diseaseId = +this.sessionForm.value.diseaseId;
    this.sessionModel.subDiseaseId = +this.sessionForm.value.subDiseaseId;
    this.sessionModel.medicine = this.sessionForm.value.medicine;
    this.sessionModel.notes = this.sessionForm.value.notes;
    this.sessionModel.patientId = +this.patientId;

    this.api.addSession(this.sessionModel).subscribe(
      (res) => {
        alert('Session Added Successfully!');
        this.goBack();
      },
      (err) => {
        alert('Something Went Wrong: ' + err);
      }
    );
  }

  changesubDisease(disease: any): void {
    const diseaseID = disease.target.value;
    if (diseaseID) {
      this.api.getAllSubDiseasesWithId(diseaseID).subscribe((res) => {
        if (res.data[0].subDieaseModelView) {
          this.selectedSubDiseases = res.data[0].subDieaseModelView;
        } else {
          this.selectedSubDiseases = [];
        }
      });
    }
  }

  onToothClick(toothTitle: string): void {
    this.sessionForm.get('toothName').patchValue(toothTitle);
    this.toothClicked = true;
  }

  goBack(): void {
    this.router.navigate(['/patientDetails/', this.patientId]);
  }
}
