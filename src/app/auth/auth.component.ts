import { Component, OnInit } from '@angular/core';
import { ModalComponent } from "src/app/shared/modal/modal.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(private _NgbModal:NgbModal , private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  open(item: any , i:any) {
    const modalRef = this._NgbModal.open(ModalComponent);
    modalRef.componentInstance.item = item;

    modalRef.componentInstance.sendIdForDelete.subscribe((result: any) => {
        console.log(result)
        this.toastr.success('Hello world!', 'Toastr fun!');


    })


    //    console.log(item)
  }
  

}
