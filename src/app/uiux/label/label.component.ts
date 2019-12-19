import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angel-label',
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
