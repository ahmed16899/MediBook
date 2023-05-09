import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
contactusform:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.contactusform=new FormGroup({
      'name':new FormControl(null,Validators.required),
      'email':new FormControl(null,[Validators.email,Validators.required]),
      'subject':new FormControl(null,Validators.required),
      'message':new FormControl(null,[Validators.required,Validators.minLength(20),Validators.maxLength(150)])
    });
  }

}
