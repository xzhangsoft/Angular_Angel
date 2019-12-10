import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "angel-widgets",
  templateUrl: "./widgets.component.html",
  styleUrls: ["./widgets.component.scss"]
})
export class WidgetsComponent implements OnInit {
  @Input() widgetCls: string = "row";
  @Input() item: any;

  @Input() title: any;
  @Input() value: any;
  @Input() progressbar: boolean = false;
  @Input() cardImg: boolean = false;
  @Input() showArrow: boolean = true;
  @Input() showRightBtn: boolean = false;

  @Input() titleCls: string;
  @Input() valueCls: string;
  @Input() progressCls: string;

  @Output() events = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  arrowClicked() {
    this.events.emit({
      type: "arrowClicked"
    });
  }
}
