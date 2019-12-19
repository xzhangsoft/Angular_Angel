import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-flow-container',
  templateUrl: './flow-container.component.html',
  styleUrls: ['./flow-container.component.scss'],
  animations: [
    trigger('toggleMenu', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300, style({ transform: 'translateX(0)' }))
      ]),
      // 动画时间可自行调整
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class FlowContainerComponent implements OnInit {

  @Input() zindex = 10;
  @Input() widgetsConfigs: any;

  @Output() events = new EventEmitter<any>();

  showFC = false;


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showFC = true;
    }, 1000);
    console.log('=== bs widgets ===', this.widgetsConfigs);
  }

}
