import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private toastr: ToastrService , private auth:AuthService , private router:Router) { }
  checkLoader:boolean = true
  ngOnInit(): void {
  }
  loginForm:FormGroup=new FormGroup({
    credential: new FormControl(null,[Validators.required , /*Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)*/]),
    password: new FormControl(null,[Validators.required ,/* Validators.minLength(6)*/]),
  })
  submitForm()
  {
    this.checkLoader = false
    this.auth.login(this.loginForm.value).subscribe((res)=>{
      console.log(res)
      /*if(res.message == 'wrong password')
      {
        this.toastr.error('error', 'wrong password');
      }
      else if (res.message == 'wrong username or email or phone ')
      {
        this.toastr.error('error', 'wrong username or email or phone');

      }
      else
      {
        this.toastr.success('success', 'Sign in Successfully');
        localStorage.setItem('userData',JSON.stringify(res.user)) //JSON.stringify()
        localStorage.setItem('token',res.user.token)
        if(res.user.type == 'doctor')
        {
          this.auth.userType.next('doctor');
          this.router.navigate(['doctor/addslot'])
          console.log(this.auth.userType.getValue())
        }
        else if(res.user.type == 'patient')
        {
          this.auth.userType.next('patient');
          this.router.navigate(['patient/dashboard'])
          console.log(this.auth.userType.getValue())
        }
        else if(res.user.type == 'admin')
        {
          this.auth.userType.next('admin');
          this.router.navigate(['admin/dashboard'])
          console.log(this.auth.userType.getValue())
        }
      }*/

      if(res.message == "user signed in successfully")
      {
        this.toastr.success('success', 'Sign in Successfully');
        localStorage.setItem('userData',JSON.stringify(res.user)) //JSON.stringify()
        localStorage.setItem('token',res.user.token)
        if(res.user.type == 'doctor')
        {
          this.auth.userType.next('doctor');
          this.auth.userdata.next(res.user);
          this.router.navigate(['doctor/addslot'])
          console.log(this.auth.userType.getValue())
        }
        else if(res.user.type == 'patient')
        {
          this.auth.userType.next('patient');
          //this.auth.setUserData();
          this.auth.userdata.next(res.user);

          this.router.navigate(['patient/dashboard'])
          console.log(this.auth.userType.getValue())
        }
        else if(res.user.type == 'admin')
        {
          this.auth.userType.next('admin');
          //this.auth.setUserData();
          this.auth.userdata.next(JSON.stringify(res.user));

          this.router.navigate(['admin/dashboard'])
          console.log(this.auth.userType.getValue())
        }
      }
      else if (res=="Your account is pending"){
        this.toastr.error('error', 'Wait for your account acceptance');
      }
      else
      {
        this.toastr.error('error', 'wrong username or email or phone');
      }
      this.checkLoader = true
    })
  console.log(this.loginForm.value)
  }

}
