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
import { FlowContainerComponent } from 'src/app/flow-container/flow-container.component';
import { DywidgetsDirective } from 'src/app/dywidgets.directive';
import { IAngelWidget, IAngelEvent, IAngelPage } from 'src/app/interface';
import { AppService } from 'src/app/app.service';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'ultron-dynamic-widgets-engine',
  templateUrl: './dynamic-widgets-engine.component.html',
  styleUrls: ['./dynamic-widgets-engine.component.scss']
})
export class DynamicWidgetsEngineComponent implements OnInit {
  zindexInit = 10;
  zindexAdd = 10;

  @Output() engineEvents = new EventEmitter<any>();
  @Input() item: any;
  @Input() from: string;
  @Input() type: string = 'Bottomsheet';
  @ViewChild(DywidgetsDirective, { static: true })
  dywidgetsDirective: DywidgetsDirective;

  constructor(private resolver: ComponentFactoryResolver, private appService: AppService) { }

  ngOnInit() {
    this.injectBasicComponent(this.item);
  }

  injectBasicComponent(item: IAngelWidget) {
    this.dynamicConf(WidgetsComponent, item, item.fields);
  }

  createNextPage(item: IAngelPage) {
    if (!item) {
      return;
    }
    const flowField = {
      zindex: this.zindexInit,
      widgetsConfigs: item.widgets,
      hasBottomBtn: item.hasBottomBtn
    };
    this.dynamicConf(FlowContainerComponent, item, flowField);
  }

  dynamicConf(widgetConf: any, item: any, fields: any) {
    const factory = this.resolver.resolveComponentFactory(widgetConf);
    const targetDOM: ViewContainerRef = this.dywidgetsDirective
      .viewContainerRef;

    const componentRef: any = targetDOM.createComponent(factory);
    this.addSubscribe(componentRef.instance);
    componentRef.instance.item = item;
    this.assignProperty(componentRef.instance, fields);
  }

  getPageFromWidgetId(item: IAngelWidget, page) {

    const targetPage = _.get(page.find((data: IAngelEvent) => data.flowType === 'Bottomsheet'), 'targetPage');
    if (!targetPage) {
      return;
    }
    this.appService.getPageConfigById(targetPage) ? this.createNextPage(this.appService.getPageConfigById(targetPage)) : '';
  }

  adjustFlowType(item: IAngelWidget) {
    const widgetId = item.id;
    const page: IAngelEvent[] = this.appService.getEventConfigById(widgetId);
    if (page) {
      if (this.type === 'Bottomsheet' && page.find(data => data.flowType === 'Bottomsheet')) {
        this.getPageFromWidgetId(item, page);
      }
      if (this.type === 'Dialog' && page.find(data => data.flowType === 'Dialog')) {
        this.replacePageEvent(item);
      }
    }
  }

  addSubscribe(componentRef) {
    componentRef.events.subscribe(data => {
      const item: IAngelWidget = data.item;
      switch (data.type) {
        case 'saveConfig':
          this.saveConfig(item);
          break;
        case 'arrowClicked':
          if (this.from === 'flow') {
            this.adjustFlowType(item);
          }
          break;
        case 'editEvent':
          if (this.from === 'factory') {
            this.editEvent(item);
          }
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

  replacePageEvent(item: IAngelWidget) {
    this.engineEvents.emit({
      type: 'replacePage',
      item
    });
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


}
