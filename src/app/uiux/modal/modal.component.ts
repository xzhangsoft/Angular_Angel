import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'angel-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalContent: any;
  @Output() modalEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  confirm(type: string, val: any) {
    this.modalEvent.emit({type, val});
  }
}
