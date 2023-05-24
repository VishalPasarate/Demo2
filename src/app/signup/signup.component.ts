import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  submitted = false
  registerForm: any;
  signupForm: any;
  loginForm: any;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email,]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    })
  }

  // // Make method to create User
  signup() {
    alert("sign up clicked")
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).pipe(map((res: any) => {
      console.log("res", res)
      console.warn(this.signupForm.value)

    })).subscribe(res => {
      alert("Registration SuccessFull")
      this.signupForm.reset();
      this.router.navigate(['login'])
    })
    alert("Success")
  }
  get name() {
    return this.signupForm.get('name')
  }
  get mobile() {
    return this.signupForm.get('mobile')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('password')
  }
}
