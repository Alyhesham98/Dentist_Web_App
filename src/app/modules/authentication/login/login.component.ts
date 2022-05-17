import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggedIn: boolean;
  isLoading = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.api.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log('Logged in as a Doctor successfully.');
        this.router.navigate(['home/dashboard']);
        this.loggedIn = true;
        this.isLoading = false;
      },
      (error) => {
        alert('Username or Password is incorrect!');
        console.log('login error: ', error);
        this.loggedIn = false;
        this.isLoading = false;
      }
    );
  }
}
