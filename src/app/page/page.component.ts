import { Component, OnInit } from '@angular/core';
import { IAngelPage, IAngelWidget } from '../interface';
import { AppService } from '../app.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  readyPages: IAngelPage[];

  showEmpty = true;
  showSpinner = true;
  content: any;
  modalContent: any;

  constructor(private appService: AppService,
              private router: Router) {}

  ngOnInit() {
    this.appService.getContent().subscribe(data => {
      this.content = data;
     });
    this.readyPages = _.get(this.appService.getPageMetadata(), 'angel');
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
    this.modalContent = this.content.confirmRemoveModal;
    $('#removeAllPageModal').modal('show');
  }

  modalConfirm() {
    $('#removeAllPageModal').modal('hide');
    localStorage.removeItem('pageMetadata');
    this.readyPages = _.get(this.appService.getPageMetadata(), 'angel');
    this.showEmpty = true;
  }
}
