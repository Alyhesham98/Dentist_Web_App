import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { SubDisease } from 'src/app/shared/models/sub-disease.model';

@Component({
  selector: 'app-diseases-details',
  templateUrl: './diseases-details.component.html',
  styleUrls: ['./diseases-details.component.css'],
})
export class DiseasesDetailsComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;

  diseaseId: number;
  diseaseName: string;
  formValue!: FormGroup;
  subDiseaseModelObj: SubDisease = new SubDisease();
  subDiseaseData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.diseaseId = +this.route.snapshot.params.id;
    this.formValue = this.formbuilder.group({
      subDiseaseName: [''],
      subDiseaseInfo: [''],
    });
    this.getAllSubDiseases();
  }

  clickAddSubDisease(): void {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postSubDiseaseDetails(): void {
    this.subDiseaseModelObj = new SubDisease();
    this.subDiseaseModelObj.name = this.formValue.value.subDiseaseName;
    this.subDiseaseModelObj.information = this.formValue.value.subDiseaseInfo;
    this.subDiseaseModelObj.diseaseId = this.diseaseId;

    this.api.addsubDisease(this.subDiseaseModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Sub-Disease Added Successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllSubDiseases();
      },
      (err) => {
        alert('Something Went Wrong: ' + err);
      }
    );
  }

  getAllSubDiseases(): void {
    this.api.getDiseaseWithId(this.diseaseId).subscribe(res => {
      this.diseaseName = res.data.name;
      this.api.getAllSubDiseasesWithId(this.diseaseId).subscribe((ress: any) => {
        this.subDiseaseData = ress.data[0].subDieaseModelView;
      });
    });
  }

  onEdit(row: any): void {
    this.showAdd = false;
    this.showUpdate = true;
    this.subDiseaseModelObj.id = row.id;
    this.formValue.controls.subDiseaseName.setValue(row.name);
    this.formValue.controls.subDiseaseInfo.setValue(row.information);
  }

  updateSubDiseaseDetails(): void {
    this.subDiseaseModelObj.name = this.formValue.value.subDiseaseName;
    this.subDiseaseModelObj.information = this.formValue.value.subDiseaseInfo;
    this.subDiseaseModelObj.diseaseId = this.diseaseId;

    this.api.updatesubDisease(this.subDiseaseModelObj).subscribe((res) => {
      alert('Updated Successfully');
      const ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllSubDiseases();
    });
  }
}
