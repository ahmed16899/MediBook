import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  test:any;
  departmentsarray:string[]=[]
  addressarray:string[]=[];
  constructor(private fb: FormBuilder , private toastr: ToastrService , private auth:AuthService , private router:Router ) {
    this.addUserForm = this.fb.group({
      email: [''],
      name: ['', Validators.required],
      mobilePhone: [ '', [Validators.required]],
      type: ['' , [Validators.required]],

      username: ['', Validators.required],
   
      password: ['', [Validators.required, /*Validators.minLength(8)*/]],
      profileImage: [ , [Validators.required]],
     
      gender: ['', Validators.required],
      clinicAddress: [''],
      specification: [''],
      role: [''],

    });
  }

  ngOnInit(): void {
    this.addressarray = this.auth.addressarray
    this.departmentsarray = this.auth.departmentsarray
  }
  submitForm() {

    console.log(this.addUserForm.value)
    const formData:any = new FormData();
    const fileInput:any = document.getElementById('image');
    console.log(this.test , 'teeeeeeeeeeeeeeeeeeesat')
   formData.append('profileImage',this.test , this.test.name);
   formData.append('email', this.addUserForm.controls['email'].value);
   formData.append('username',this.addUserForm.controls['username'].value);
   formData.append('password', this.addUserForm.controls['password'].value);
   formData.append('gender', this.addUserForm.controls['gender'].value);
   formData.append('type', this.addUserForm.controls['type'].value);
   formData.append('mobilePhone', this.addUserForm.controls['mobilePhone'].value);
   formData.append('name', this.addUserForm.controls['name'].value);
   formData.append('clinicAddress', this.addUserForm.controls['clinicAddress'].value);
   formData.append('specification', this.addUserForm.controls['specification'].value);
   formData.append('role', this.addUserForm.controls['role'].value);


   this.auth.register(formData).subscribe((res)=>{
        console.log(res)
        if(res.message == 'already logged')
        {
          this.toastr.error('error', 'This mail used already');

        }
        else
        {
          this.toastr.success('success', 'Sign in Successfully');

          this.router.navigate(['admin'])
        }
   })
  }

  onFileSelected(event:any) {
    this.addUserForm.controls['profileImage']?.setValue('')
    if(event.target.files[0].type.includes('image/png') || event.target.files[0].type.includes('image/jpeg') ||  event.target.files[0].type.includes('image/jpeg'))
    {
      this.addUserForm.controls['profileImage']?.setValue(event.target.files[0])
      this.test = event.target.files[0]
    }
    else
    {
      this.toastr.error('error', 'Enter Valid Image!');
    }
  }

}
