import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';
import { WidgetsComponent } from 'src/app/widgets/widgets.component';
import { DywidgetsDirective } from 'src/app/dywidgets.directive';
import { IAngelWidget } from 'src/app/interface';
declare var $: any;

@Component({
  selector: 'angel-dynamic-widgets-engine',
  templateUrl: './dynamic-widgets-engine.component.html',
  styleUrls: ['./dynamic-widgets-engine.component.scss']
})
export class DynamicWidgetsEngineComponent implements OnInit {
  @Output() engineEvents = new EventEmitter<any>();
  @Input() item: any;
  @ViewChild(DywidgetsDirective, { static: true })
  dywidgetsDirective: DywidgetsDirective;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.injectBasicComponent(this.item);
  }

  injectBasicComponent(item: any) {
    const basicComponentRef = WidgetsComponent;
    const factory = this.resolver.resolveComponentFactory(basicComponentRef);
    const targetDOM: ViewContainerRef = this.dywidgetsDirective
      .viewContainerRef;
    targetDOM.clear();

    const componentRef: any = targetDOM.createComponent(factory);
    this.addSubscribe(componentRef.instance);
    componentRef.instance.item = item;
    this.assignProperty(componentRef.instance, item.fields);
  }

  addSubscribe(componentRef) {
    componentRef.events.subscribe(data => {
      const item: IAngelWidget = data.item;
      switch (data.type) {
        case 'saveConfig':
          this.saveConfig(item);
          break;
        case 'arrowClicked':
          this.createNextPage(item);
          break;
        case 'editEvent':
          this.editEvent(item);
          break;
        case 'editConfig':
          this.editConfig(item);
      }
    });
  }

  assignProperty(comInstance, itemFields) {
    try {
      Object.keys(itemFields).forEach(key => {
        comInstance[key] = itemFields[key];
      });
    } catch (e) {
      console.log(e);
    }
  }

  saveConfig(item: IAngelWidget) {
    this.engineEvents.emit({
      type: 'openModal',
      item
    });
  }

  editEvent(item: IAngelWidget) {
    this.engineEvents.emit({
      type: 'editEvent',
      item
    });
  }

  editConfig(item: IAngelWidget) {
    this.engineEvents.emit({
      type: 'editConfig',
      item
    });
  }

  createNextPage(item: IAngelWidget) {
    this.engineEvents.emit({
      type: 'goNext',
      item
    });
  }
}
