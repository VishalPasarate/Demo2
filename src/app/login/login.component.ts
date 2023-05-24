import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;

  
  constructor(private formBuilder:FormBuilder,private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm  = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this._http.get<any>("http://localhost:3000/signup").pipe(map((res:any)=>{
      console.log("res",res)
      const user = res.find((a:any)=>{
        console.log(a);
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password

      })
      if(user){
        alert("Login Successful");
        this.loginForm.reset();
        this.router.navigate(['dashboard'])
      }
      else{
        alert("User not Found")
      }

    
    })).subscribe((res:any)=>{console.log(res)})
    
    
  }
}
