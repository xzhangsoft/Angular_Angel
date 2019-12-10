import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { AppService } from "./../app.service";

@Component({
  selector: "app-factory",
  templateUrl: "./factory.component.html",
  styleUrls: ["./factory.component.scss"]
})
export class FactoryComponent implements OnInit {
  editingWidgets: string[];
  widgetsList: string[];

  page: string;
  theme: string;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getWidgets().subscribe(data => {
      this.widgetsList = data.widgets;
    });

    this.appService.getProfile().subscribe(data => {
      this.editingWidgets = data.widgets;
    });
  }

  editEvent(event: Event) {
    console.log(event);
    $("#editEvent").modal("show");
  }

  saveEvent() {
    $("#editEvent").modal("hide");
    console.log(this.page, this.theme);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.editingWidgets);
  }
}
