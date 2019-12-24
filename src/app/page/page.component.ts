import { Component, OnInit } from '@angular/core';
import { IAngelPage } from '../interface';
import { AppService } from '../app.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'ultron-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  readyPages: IAngelPage[];

  showEmpty = true;
  showSpinner = true;
  content: any;
  modalContent: any;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.getContent().subscribe(data => {
      this.content = data;
    });
    this.readyPages = this.appService.getPageMetadata();
    if (this.readyPages && this.readyPages.length > 0) {
      this.showEmpty = false;
    }
  }

  reEdit(page: IAngelPage) {
    this.router.navigate(['/factory'], {
      queryParams: {
        page: JSON.stringify(page)
      },
      skipLocationChange: true
    });
  }

  goLive(page: IAngelPage) {
    this.router.navigate(['/live'], {
      queryParams: {
        page: JSON.stringify(page)
      },
      skipLocationChange: true
    });
  }

  removeAllPage() {
    if (this.appService.getPageMetadata().length === 0) {
      this.modalContent = this.content.warnRemoveModal;
    } else {
      this.modalContent = this.content.confirmRemoveModal;
    }
    setTimeout(() => {
      $('#removeAllPageModal').modal('show');
    });
  }

  exportMetadata() {
    this.appService.exportMetadata().subscribe((data) => {

    });
    this.modalContent = this.content.notifyCorrectExportResultModal;
    $('#removeAllPageModal').modal('show');
  }

  modalConfirm(val: any) {
    const type = val.type;
    switch (type) {
      case 'confirmRemoveModal':
        this.clearMetadata();
        break;
    }
    $('#removeAllPageModal').modal('hide');
  }

  clearMetadata() {
    localStorage.removeItem('pageMetadata');
    localStorage.removeItem('eventMetadata');
    localStorage.removeItem('widgetIdIndex');
    this.readyPages = _.get(this.appService.getPageMetadata(), 'angel');
    this.showEmpty = true;
  }
}
