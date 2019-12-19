import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'angel-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() cls: string;

  constructor() { }

  ngOnInit() {
  }

}
