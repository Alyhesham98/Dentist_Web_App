import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Disease } from 'src/app/shared/models/disease.model';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css'],
})
export class DiseasesComponent implements OnInit {
  formValue!: FormGroup;
  diseaseModelObj: Disease = new Disease();
  diseaseData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  isLoading = false;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      diseaseName: [''],
      // diseaseInfo: [''],
    });
    this.getAllDiseases();
  }

  clickAddDisease(): void {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postDiseaseDetails(): void {
    this.diseaseModelObj = new Disease();
    this.diseaseModelObj.name = this.formValue.value.diseaseName;
    // this.diseaseModelObj.information = this.formValue.value.diseaseInfo;

    this.api.addDisease(this.diseaseModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Disease Added Successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllDiseases();
      },
      (err) => {
        alert('Something Went Wrong: ' + err);
      }
    );
  }

  getAllDiseases(): void {
    this.isLoading = true;
    this.api.getAllDiseaseName().subscribe(
      (res) => {
        this.diseaseData = res.data;
        this.isLoading = false;
      },
      (err) => {
        alert('Error showing diseases!');
        this.isLoading = false;
      }
    );
  }

  diseaseDetails(diseaseId: any): void {
    this.router.navigate(['/diseaseDetails', diseaseId]);
  }

  onEdit(row: any): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.diseaseModelObj.id = row.id;
    this.formValue.controls.diseaseName.setValue(row.name);
    // this.formValue.controls.diseaseInfo.setValue(row.information);
  }

  updateDiseaseDetails(): void {
    this.diseaseModelObj.name = this.formValue.value.diseaseName;
    // this.diseaseModelObj.information = this.formValue.value.diseaseInfo;

    this.api.updateDisease(this.diseaseModelObj).subscribe((res) => {
      alert('Disease Updated Successfully');
      const ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllDiseases();
    });
  }

  onDiseaseDelete(diseaseId: any, diseaseName: string): void {
    if (confirm('Are you sure to delete "' + diseaseName + '"?')) {
      this.api.deleteDisease(diseaseId).subscribe((res) => {
        alert('Disease Deleted Successfully');
        this.getAllDiseases();
      });
    }
  }
}
