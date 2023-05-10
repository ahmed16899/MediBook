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
  test: any;
  departmentsarray: string[] = [];
  addressarray: string[] = [];
  checkLoader: boolean = true

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.addUserForm = this.fb.group({
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
    console.log(this.addUserForm.value);
    const formData: any = new FormData();
    const fileInput: any = document.getElementById('image');
    console.log(this.test, 'teeeeeeeeeeeeeeeeeeesat');
    formData.append(
      'profileImage',
      this.addUserForm.controls['profileImage'].value,
      this.addUserForm.controls['profileImage'].value.name
    );
    formData.append('email', this.addUserForm.controls['email'].value);
    formData.append('username', this.addUserForm.controls['username'].value);
    formData.append('password', this.addUserForm.controls['password'].value);
    formData.append('gender', this.addUserForm.controls['gender'].value);
    formData.append('type', this.addUserForm.controls['type'].value);
    formData.append(
      'mobilePhone',
      this.addUserForm.controls['mobilePhone'].value
    );
    formData.append('name', this.addUserForm.controls['name'].value);

    if (this.addUserForm.controls['type'].value == 'doctor') {
      formData.append(
        'certificate',
        this.addUserForm.controls['certificate'].value,
        this.addUserForm.controls['certificate'].value.name
      );
      formData.append(
        'clinicAddress',
        this.addUserForm.controls['clinicAddress'].value
      );
      formData.append(
        'specification',
        this.addUserForm.controls['specification'].value
      );
      formData.append('role', this.addUserForm.controls['role'].value);
    }

    /*formData.append('doctorSpecification', {
    specification:this.addUserForm.controls['specification'].value ,
    role:this.addUserForm.controls['role'].value
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
          'Added Successfully'
        );
        this.router.navigate(['admin/dashboard']);
      } else {
        this.toastr.error('error', `Can't add with this doctor`);
      }
      this.checkLoader = true
    });
  }

  onFileSelected(event: any) {
    this.addUserForm.controls['profileImage']?.setValue('');
    if (
      event.target.files[0].type.includes('image/png') ||
      event.target.files[0].type.includes('image/jpeg') ||
      event.target.files[0].type.includes('image/jpeg')
    ) {
      this.addUserForm.controls['profileImage']?.setValue(event.target.files[0]);
      this.test = event.target.files[0];
    } else {
      this.toastr.error('error', 'Enter Valid Image!');
    }
  }

  onFileSelectedCer(event: any) {
    this.addUserForm.controls['certificate']?.setValue('');
    if (
      event.target.files[0].type.includes('image/png') ||
      event.target.files[0].type.includes('image/jpeg') ||
      event.target.files[0].type.includes('image/jpeg')
    ) {
      this.addUserForm.controls['certificate']?.setValue(event.target.files[0]);
      this.test = event.target.files[0];
    } else {
      this.toastr.error('error', 'Enter Valid Image!');
    }
  }
}


