import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ultron-flow-container',
  templateUrl: './flow-container.component.html',
  styleUrls: ['./flow-container.component.scss'],
  animations: [
    trigger('popupFC', [
      transition('void => *', [
        style({ transform: 'translateY(100%)' }),
        animate(300, style({ transform: 'translateY(0)' }))
      ]),
      // 动画时间可自行调整
      transition('* => void', [
        animate(300, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class FlowContainerComponent implements OnInit {

  @Input() zindex = 10;
  @Input() widgetsConfigs: any;

  @Output() events = new EventEmitter<any>();

  showFC = false;
  showCover = true;

  constructor() { }

  ngOnInit() {
    this.showFC = true;
    console.log('=== bs widgets ===', this.widgetsConfigs);
  }

  preventEvent(event: Event) {
    console.log('preventEvent');
    event.stopPropagation();
  }

  closeFC(event: Event) {
    console.log('closeFC');
    event.stopPropagation();
    this.showFC = false;
    setTimeout(() => {
      this.showCover = false;
    }, 300);
  }
}
