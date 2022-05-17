import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registered: boolean;
  isLoading = false;

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.api
      .registerUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        phone: this.registerForm.value.phone,
        age: this.registerForm.value.age,
        userName: this.registerForm.value.userName,
        role: this.registerForm.value.role,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (response) => {
          alert('User Registered Successfully!');
          this.registerForm.reset();
          this.registered = true;
          this.isLoading = false;
        },
        (error) => {
          alert('Error Registering user!' + error);
          this.registered = false;
          this.isLoading = false;
        }
      );
  }
}
