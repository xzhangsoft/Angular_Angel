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
import { UltronConstant } from '../constant';
declare var $: any;

@Component({
  selector: 'ultron-factory',
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
  private editWidetId: string;
  private editPageId = '';
  private editWidgetId = '';
  showmenu: boolean = true;
  menuToggleImg = '/assets/images/Left.png';
  widgetIndex: number = 0;
  hasBottomBtn: boolean = false;

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
    this.appService.getData().subscribe(data => {
      this.widgetsList = data.widgets;
      this.basicWidgets = data.widgets;
    });

    this.appService.getContent().subscribe(data => {
      this.content = data;
    });
  }

  removeWidgets() {
    this.editingWidgets = [];
    this.hasBottomBtn = false;
  }

  toogleMenu() {
    this.showmenu = !this.showmenu;
    this.menuToggleImg = this.showmenu ? UltronConstant.ULTRON_IMAGE_URL + 'Left.png' : UltronConstant.ULTRON_IMAGE_URL + 'Right.png';
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
    setTimeout(() => {
      $('#editEvent').modal('show');
    });
  }

  modalConfirm(modalEvent: { type, val, eventType }) {
    const confirmType = modalEvent.type;
    const val = modalEvent.val;
    const eventType = modalEvent.eventType;
    switch (confirmType) {
      case 'editConfig':
        this.updateWidgetConfig(val);
        break;
      case 'savePage':
        if (val.length < 1) {
          break;
        }
        const newPageId = val[0].inputVal;
        this.filterConfig(newPageId);
        this.editPageId = newPageId;
        val[0].inputVal = '';
        break;
      case 'editEvent':
        this.updateEvent(val, eventType);
        val[0].inputVal = '';
        break;
      case 'notify':
        break;
    }
    $('#editEvent').modal('hide');
  }

  saveEventCheck() {
    const metadata: IAngelPage[] = this.appService.getPageMetadata();
    if (metadata.some(data => data.id === this.editPageId)) {
      const updateMeta = metadata.map((data: IAngelPage) => {
        if (data.id === this.editPageId) {
          data.widgets = this.editingWidgets;
          data.hasBottomBtn = this.hasBottomBtn;
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
      const resetArr = [
        'name',
        'title',
        'value',
        'showRightBtn'
      ];

      if (resetArr.includes(fieldKey)) {
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
      widgets: this.editingWidgets,
      hasBottomBtn: this.hasBottomBtn
    };
    pageMetadata.push(pageConfig);
    return this.appService.updatePageMetadata(pageMetadata);
  }

  updateEvent(val: [{ key: string, value: string, inputVal: string }], flowType: string) {
    const targetPageId = val.find(data => data.key === 'target-page:').inputVal;
    if (!targetPageId) {
      this.modalContent = this.content.warnEventModal;
      return;
    }
    const currentEventConfigByIdcurrentEventConfig: IAngelEvent[] = this.appService.getEventConfig();
    if (currentEventConfigByIdcurrentEventConfig.length !== 0) {
      const eventConfig: IAngelEvent = {};
      eventConfig.flowType = flowType;
      eventConfig.widgetId = this.editWidgetId;
      eventConfig.targetPage = targetPageId;
      // marshal 待改标记
      currentEventConfigByIdcurrentEventConfig.some(data => {
        if (this.editWidgetId === data.widgetId && flowType === data.flowType) {
          data.flowType = flowType;
          data.widgetId = this.editWidgetId;
          data.targetPage = targetPageId;
          return true;
        }
      }) ? '' : currentEventConfigByIdcurrentEventConfig.push(eventConfig);
    } else {
      const eventConfig: IAngelEvent = {};
      eventConfig.flowType = flowType;
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
      this.widgetIndex += 1;
      copyArrayItem(
        lastContainerData,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (lastContainerData[event.previousIndex].id === 'ody-bottom-btn') {
        this.hasBottomBtn = true;
      }
    }
    const eventData: any = event.container.data[event.currentIndex];
    eventData.id = 'widget' + this.widgetIndex;
  }
}
