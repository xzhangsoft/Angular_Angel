import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appDywidgets]"
})
export class DywidgetsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
