import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorserviceService } from 'src/app/doctor/services/doctorservice.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  test: any;
  departmentsarray: string[] = [];
  addressarray: string[] = [];
  checkLoader:boolean = true

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required /*Validators.email*/]],
      name: ['', Validators.required],
      mobilePhone: ['', [Validators.required]],
      type: ['', [Validators.required]],

      username: ['', Validators.required],

      password: ['', [Validators.required /*Validators.minLength(8)*/]],
      profileImage: [, [Validators.required]],

      gender: ['', Validators.required],
      clinicAddress: [''],
      specification: [''],
      role: [''],
      certificate: [],
    });
  }
  ngOnInit(): void {
    this.addressarray = this.auth.addressarray;
    this.departmentsarray = this.auth.departmentsarray;
  }

  submitForm() {
    this.checkLoader = false
    console.log(this.signupForm.value);
    const formData: any = new FormData();
    const fileInput: any = document.getElementById('image');
    console.log(this.test, 'teeeeeeeeeeeeeeeeeeesat');
    formData.append(
      'profileImage',
      this.signupForm.controls['profileImage'].value,
      this.signupForm.controls['profileImage'].value.name
    );
    formData.append('email', this.signupForm.controls['email'].value);
    formData.append('username', this.signupForm.controls['username'].value);
    formData.append('password', this.signupForm.controls['password'].value);
    formData.append('gender', this.signupForm.controls['gender'].value);
    formData.append('type', this.signupForm.controls['type'].value);
    formData.append(
      'mobilePhone',
      this.signupForm.controls['mobilePhone'].value
    );
    formData.append('name', this.signupForm.controls['name'].value);

    if (this.signupForm.controls['type'].value == 'doctor') {
      formData.append(
        'certificate',
        this.signupForm.controls['certificate'].value,
        this.signupForm.controls['certificate'].value.name
      );
      formData.append(
        'clinicAddress',
        this.signupForm.controls['clinicAddress'].value
      );
      formData.append(
        'specification',
        this.signupForm.controls['specification'].value
      );
      formData.append('role', this.signupForm.controls['role'].value);
    }

    /*formData.append('doctorSpecification', {
    specification:this.signupForm.controls['specification'].value ,
    role:this.signupForm.controls['role'].value
  });*/

    //console.log(formData['profileImage'])

    this.auth.register(formData).subscribe((res) => {
      console.log(res);
      /*if(res.message == 'already logged')
        {
          this.toastr.error('error', 'This mail used already');

        }
        else
        {
          this.toastr.success('success', 'Data sent successfully , wait to review your certificate');
          this.router.navigate(['auth/signin'])
        }*/

      if (res.message == 'User create succesfully') {
        this.toastr.success(
          'success',
          'Data sent successfully , wait to review your certificate'
        );
        this.router.navigate(['auth/signin']);
      } else {
        this.toastr.error('error', `Can't signup with this data`);
      }
      this.checkLoader = true
    });
  }

  onFileSelected(event: any) {
    this.signupForm.controls['profileImage']?.setValue('');
    if (
      event.target.files[0].type.includes('image/png') ||
      event.target.files[0].type.includes('image/jpeg') ||
      event.target.files[0].type.includes('image/jpeg')
    ) {
      this.signupForm.controls['profileImage']?.setValue(event.target.files[0]);
      this.test = event.target.files[0];
    } else {
      this.toastr.error('error', 'Enter Valid Image!');
    }
  }

  onFileSelectedCer(event: any) {
    this.signupForm.controls['certificate']?.setValue('');
    if (
      event.target.files[0].type.includes('image/png') ||
      event.target.files[0].type.includes('image/jpeg') ||
      event.target.files[0].type.includes('image/jpeg')
    ) {
      this.signupForm.controls['certificate']?.setValue(event.target.files[0]);
      this.test = event.target.files[0];
    } else {
      this.toastr.error('error', 'Enter Valid Image!');
    }
  }
}
