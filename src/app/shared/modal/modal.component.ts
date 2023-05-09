import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() item:any;
  @Output() sendIdForDelete = new EventEmitter<string>();
 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
   // console.log(this.item)
  }
  deleteItem(item: any) {
    //console.log(item.Id)
    this.sendIdForDelete.emit(item);
  }

}



