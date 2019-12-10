import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { WidgetsComponent } from "src/app/widgets/widgets.component";
import { DywidgetsDirective } from "src/app/dywidgets.directive";

@Component({
  selector: "angel-dynamic-widgets-engine",
  templateUrl: "./dynamic-widgets-engine.component.html",
  styleUrls: ["./dynamic-widgets-engine.component.scss"]
})
export class DynamicWidgetsEngineComponent implements OnInit {
  @Input() item: any;
  @ViewChild(DywidgetsDirective, { static: true }) dywidgetsDirective: DywidgetsDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.injectBasicComponent(this.item);
  }

  injectBasicComponent(item: any) {
    const basicComponentRef = WidgetsComponent;
    const factory = this.resolver.resolveComponentFactory(basicComponentRef);
    const targetDOM: ViewContainerRef = this.dywidgetsDirective.viewContainerRef;
    targetDOM.clear();

    let componentRef: any = targetDOM.createComponent(factory);
    this.assignProperty(componentRef.instance,item.fields);
  }

  assignProperty(comInstance, itemFields) {
    try {
      Object.keys(itemFields).forEach((key) => {
        comInstance[key] = itemFields[key];
      });
    } catch(e) {
      console.log(e);
    }
   
  }
}
