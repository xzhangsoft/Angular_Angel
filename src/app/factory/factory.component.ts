import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem
} from '@angular/cdk/drag-drop';
import { AppService } from './../app.service';
import { IAngelPage, IAngelWidget, IAngelEvent } from './../interface';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
declare var $: any;

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
  animations: [
    trigger('toggleMenu', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300, style({ transform: 'translateX(0)' }))
      ]),
      // 动画时间可自行调整
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class FactoryComponent implements OnInit {
  @Output() factoryEvents = new EventEmitter<any>();
  editingWidgets: IAngelWidget[] = [];

  showSpinner = true;
  private basicWidgets: string[];
  widgetsList: string[];
  content: any;
  modalContent: any;
  private inputVal: string; // 没用到貌似
  private editWidetId: string;
  private editPageId = '';
  private editWidgetId = '';
  showmenu: boolean = true;
  // 尽量不要用相对路径，这样前面的/assets/images可以封装到constant里，不然你无法确定component在哪一级，不知道要加几个点
  // menuToggleImg = './../assets/images/expandmenu.png';
  menuToggleImg = '/assets/images/expandmenu.png';

  constructor(private appService: AppService, private router: ActivatedRoute) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 300);
  }

  ngOnInit() {
    this.router.queryParams.subscribe(
      params => {
        if (Object.keys(params).length !== 0) {
          console.log(params);
          this.editPageId = JSON.parse(params.page).id;
          this.editingWidgets = JSON.parse(params.page).widgets;
        }
      }
    );
    this.appService.getData('/assets/metadata/widgets.json').subscribe(data => {
      this.widgetsList = data.widgets;
      this.basicWidgets = data.widgets;
    });

    this.appService.getContent().subscribe(data => {
      this.content = data;
    });
  }

  removeWidgets() {
    this.editingWidgets = [];
  }

  toogleMenu() {
    this.showmenu = !this.showmenu;
    // 再找一个反向箭头，显示的不一样
    this.showmenu ? this.menuToggleImg = './../assets/images/expandmenu.png' : this.menuToggleImg = './../assets/images/expandmenu.png';
  }

  engineEvents(event: { type: string, item: IAngelWidget }) {
    const item = event.item;
    switch (event.type) {
      case 'saveMetadata':
        this.saveEventCheck();
        break;
      case 'editConfig':
        this.modalContent = this.convertConfig(item);
        break;
      case 'editEvent':
        this.editWidgetId = item.id;
        this.modalContent = this.content.editEventModal;
        break;
    }
    $('#editEvent').modal('show');
  }

  modalConfirm(modalEvent: { type, val }) {
    const confirmType = modalEvent.type;
    const val = modalEvent.val;
    switch (confirmType) {
      case 'editConfig':
        this.updateWidgetConfig(val);
        $('#editEvent').modal('hide');
        break;
      case 'savePage':
        if (val.length < 1) {
          break;
        }
        const newPageId = val[0].inputVal;
        this.filterConfig(newPageId);
        $('#editEvent').modal('hide');
        break;
      case 'editEvent':
        this.updateEvent(val);
        break;
      case 'notify':
        $('#editEvent').modal('hide');
        break;
    }
  }

  saveEventCheck() {
    const metadata: IAngelPage[] = this.appService.getPageMetadata();
    if (metadata.some(data => data.id === this.editPageId)) {
      const updateMeta = metadata.map((data: IAngelPage) => {
        if (data.id === this.editPageId) {
          data.widgets = this.editingWidgets;
        }
        return data;
      });
      this.appService.updatePageMetadata(updateMeta);
      this.modalContent = this.content.notifyCorrectResultModal;
    } else {
      this.modalContent = this.content.savePageConfigModal;
    }
  }

  convertConfig(item: IAngelWidget = { id: '', widgetRef: '', fields: '' }): Array<any> {
    this.editWidetId = item.id;
    const field = item.fields;
    const editConfigModal = _.cloneDeep(this.content.editConfigModal);
    const inputGroup = _.get(editConfigModal, 'inputGroup');
    Object.keys(field).map((fieldKey) => {
      if (fieldKey === 'title' || fieldKey === 'value' || fieldKey === 'showRightBtn') {
        let group = {};
        group = {
          key: fieldKey,
          inputVal: field[fieldKey]
        };
        inputGroup.push(group);
      }
    });
    editConfigModal.inputGroup = inputGroup;
    return editConfigModal;
  }

  updateWidgetConfig(inputGroup: Array<any>) {
    const editWidgetId = this.editWidetId;
    let cloneEditWidgets = _.cloneDeep(this.editingWidgets);
    cloneEditWidgets = cloneEditWidgets.map((data) => {
      if (data.id === editWidgetId) {
        Object.keys(data.fields).map((fieldkey) => {
          inputGroup.forEach((inputData) => {
            Object.keys(inputData).map((inputkey) => {
              if (inputData[inputkey] && inputData[inputkey] === fieldkey) {
                data.fields[fieldkey] = inputData.inputVal;
              }
            });
          });
        });
      }
      return data;
    });
    this.editingWidgets = cloneEditWidgets;
    console.log(this.editingWidgets, cloneEditWidgets);
  }

  filterConfig(newPageId: string) {
    const metadata: IAngelPage[] = this.appService.getPageMetadata();
    if (metadata && metadata.some(data => data.id === newPageId)) {
      this.modalContent = this.content.warnSamePageModal;
    } else {
      if (this.addPageConfig(metadata, newPageId)) {
        this.modalContent = this.content.notifyCorrectResultModal;
      } else {
        this.modalContent = this.content.notifyFailedResultModal;
      }
    }
  }

  addPageConfig(pageMetadata: IAngelPage[], newPageId: string): boolean {
    let pageConfig: IAngelPage = {};
    pageConfig = {
      id: newPageId,
      widgets: this.editingWidgets
    };
    pageMetadata.push(pageConfig);
    return this.appService.updatePageMetadata(pageMetadata);
  }

  updateEvent(val: [{ key: '', value: '', inputVal: '' }]) {
    const targetPageId = val[0].inputVal;
    if (!targetPageId) {
      this.modalContent = this.content.warnEventModal;
      return;
    }
    const currentEventConfigByIdcurrentEventConfig: IAngelEvent[] = this.appService.getEventConfig();
    if (currentEventConfigByIdcurrentEventConfig.length !== 0) {
      const eventConfig: IAngelEvent = {};
      eventConfig.widgetId = this.editWidgetId;
      eventConfig.targetPage = targetPageId;
      currentEventConfigByIdcurrentEventConfig.some(data => {
        if (this.editWidgetId === data.widgetId) {
          data.widgetId = this.editWidgetId;
          data.targetPage = targetPageId;
          return true;
        }
      }) ? '' : currentEventConfigByIdcurrentEventConfig.push(eventConfig);
    } else {
      const eventConfig: IAngelEvent = {};
      eventConfig.widgetId = this.editWidgetId;
      eventConfig.targetPage = targetPageId;
      currentEventConfigByIdcurrentEventConfig.push(eventConfig);
    }
    this.modalContent = this.content.notifyCorrectResultModal;
    this.appService.updateEventConfig(currentEventConfigByIdcurrentEventConfig);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const lastContainerData = _.cloneDeep(event.previousContainer.data);
      copyArrayItem(
        lastContainerData,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.widgetsList = this.basicWidgets;
  }
}
