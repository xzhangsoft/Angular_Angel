import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAngelWidget, IAngelPage, IAngelEvent } from '../interface';
import { AppService } from '../app.service';
import * as _ from 'lodash';

@Component({
  selector: 'ultron-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  showSpinner: boolean = true;
  // dialogEditingWidgets: IAngelWidget[] = [];
  editingPage: IAngelPage;
  editingPageStacks: IAngelPage[] = [];
  editingWidgets: IAngelWidget[] = [];
  pageMetadata: IAngelPage[];
  eventMetadata: IAngelEvent[];
  enableBack: boolean = false;

  constructor(private router: ActivatedRoute, private appService: AppService) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }

  get dialogEditingWidgets() {
    return this.editingPage.widgets;
  }

  get hasBottomBtn() {
    if (!this.editingPage) {
      return false;
    }
    return this.editingPage.hasBottomBtn;
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        console.log(params);
        this.editingPage = JSON.parse(params.page);
        this.editingWidgets = this.editingPage.widgets;
      }
    });
    this.getMetadata();
  }

  getMetadata() {
    this.pageMetadata = this.appService.getPageMetadata();
    this.eventMetadata = this.appService.getEventConfig();
  }

  engineEvent(event: { type: string; item: IAngelWidget }) {
    const type = event.type;
    if (type !== 'replacePage') {
      return;
    }
    this.enableBack = true;
    const triggerWidgetId = event.item.id;
    try {
      const targetRepalcePageId = this.appService.getEventConfigById(triggerWidgetId).find(data => data.flowType === 'Dialog').targetPage;
      if (targetRepalcePageId) {
        this.editingPageStacks.push(_.cloneDeep(this.editingPage));
        this.editingPage = this.appService.getPageConfigById(targetRepalcePageId);
      }
    } catch (e) {
      console.log('=== dialog failed ===');
    }
  }

  back() {
    this.editingPage = this.editingPageStacks.pop();
    if (this.editingPageStacks.length < 1) {
      this.enableBack = false;
    }
  }
}
