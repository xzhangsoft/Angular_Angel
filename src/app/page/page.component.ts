import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"]
})
export class PageComponent implements OnInit {
  readyWidgets: any = [
    {
      "widget-ref": "WidgetsComponent",
      fields: { name: "mxnx xhxoxfxlxcxa nxnxox ", profile: true }
    },
    {
      "widget-ref": "WidgetsComponent",
      fields: {
        title: "Available Quick cash from your credit card. ",
        titleCls: "title",
        value: "SGD 7687",
        valueCls: "value",
        progressbar: true,
        progressCls: "pt-2"
      }
    },
    {
      "widget-ref": "WidgetsComponent",
      fields: {
        cardImg: true,
        title: "Rewards Card •••• 2187",
        titleCls: "title",
        value: "SGD 41,724.40 ",
        valueCls: "value"
      }
    }
  ];
  constructor() {}

  ngOnInit() {}
}
