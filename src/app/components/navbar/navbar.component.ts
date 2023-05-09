import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}
  type!: string;
  userData: any;
  ngOnInit(): void {
    this.auth.userType.subscribe((value) => {
      this.type = value;
    });
    this.auth.userdata.subscribe((value) => {
      this.userData = this.auth.userdata.getValue()
    });
    //this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData, 'userData');
  }
  logout() {
    this.auth.logOut();
  }
}
