import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAngelWidget, IAngelPage, IAngelEvent } from '../interface';
import { AppService } from '../app.service';

@Component({
  selector: 'ultron-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  showSpinner = true;
  dialogEditingWidgets: IAngelWidget[] = [];
  editingWidgets: IAngelWidget[] = [];
  pageMetadata: IAngelPage[];
  eventMetadata: IAngelEvent[];

  enableBack = false;

  constructor(private router: ActivatedRoute, private appService: AppService) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        console.log(params);
        this.editingWidgets = JSON.parse(params.page).widgets;
        this.dialogEditingWidgets = JSON.parse(params.page).widgets;
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

        this.dialogEditingWidgets = this.appService.getPageConfigById(targetRepalcePageId).widgets;
      }

    } catch (e) {
      console.log('=== dialog failed ===');
    }
  }

  back() {
    this.dialogEditingWidgets = this.editingWidgets;
  }
}
