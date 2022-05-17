import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Patient } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patientForm: FormGroup;
  patientModelObj: Patient = new Patient();
  patientData: any;
  onUpdate: boolean;
  isLoading = false;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.patientForm = new FormGroup({
      patientName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      mobilePhone: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      nationalId: new FormControl(null),
    });

    this.getAllPatients();
  }

  postPatientDetails(): void {
    this.patientModelObj = new Patient();

    this.patientModelObj.patientName = this.patientForm.value.patientName;
    this.patientModelObj.age = this.patientForm.value.age;
    this.patientModelObj.mobilePhone = this.patientForm.value.mobilePhone;
    this.patientModelObj.address = this.patientForm.value.address;
    this.patientModelObj.nationalId = this.patientForm.value.nationalId;

    this.api.addPatient(this.patientModelObj).subscribe(
      (res) => {
        alert('Patient Added Successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.patientForm.reset();
        this.getAllPatients();
      },
      (err) => {
        if (err.error.code === 400) {
          alert('This mobile number is already registered!');
        }
      }
    );
  }

  updatePatientDetails(): void {
    this.patientModelObj.patientName = this.patientForm.value.patientName;
    this.patientModelObj.age = this.patientForm.value.age;
    this.patientModelObj.mobilePhone = this.patientForm.value.mobilePhone;
    this.patientModelObj.address = this.patientForm.value.address;
    this.patientModelObj.nationalId = this.patientForm.value.nationalId;

    this.api.updatePatient(this.patientModelObj).subscribe((res) => {
      alert('Updated Successfully');
      const ref = document.getElementById('cancel');
      ref?.click();
      this.patientForm.reset();
      this.getAllPatients();
    });
  }

  getAllPatients(): void {
    this.isLoading = true;
    this.api.getAllPatients().subscribe((res) => {
      this.patientData = res.data;
      this.isLoading = false;
    }, err => {
      alert('Error loading patients!');
      this.isLoading = false;
    });
  }

  patientDetails(patientId: any): void {
    this.router.navigate(['/patientDetails', patientId]);
  }

  onAddPatient(): void {
    this.patientForm.reset();
    this.onUpdate = false;
  }

  onEdit(row: any): void {
    this.onUpdate = true;
    this.patientModelObj.id = row.id;
    this.patientForm.controls.patientName.setValue(row.patientName);
    this.patientForm.controls.age.setValue(row.age);
    this.patientForm.controls.mobilePhone.setValue(row.mobilePhone);
    this.patientForm.controls.address.setValue(row.address);
    this.patientForm.controls.nationalId.setValue(row.nationalId);
  }
}
