import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ultron-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  @Input() content: any;
  @Input() cls: any;

  constructor() { }

  ngOnInit() {
  }

}
