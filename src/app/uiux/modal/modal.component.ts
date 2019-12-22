import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'ultron-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() modalContent: any;
  @Input() isBtnGroup: boolean = true;
  @Output() modalEvent = new EventEmitter<any>();

  eventType = 'Bottomsheet'

  constructor() { }

  ngOnInit() {
  }

  confirm(type: string, val: any) {
    this.modalEvent.emit({ type, val, eventType: this.eventType });
  }

  chooseEventType(event: any) {
    this.eventType = _.get(event.target, 'textContent', 'Bottomsheet');
    console.log(this.eventType);
  }
}
