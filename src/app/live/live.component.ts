import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAngelWidget } from '../interface';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit{
  showSpinner = true;
  editingWidgets: IAngelWidget[] = [];
  @Input() zindex_init = 10;
  zindex_add = 10;

  constructor(private router: ActivatedRoute) {
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }

  ngOnInit() {
    this.router.queryParams.subscribe(
      params => {
        if (Object.keys(params).length !== 0) {
          console.log(params);
          // this.editPageId = JSON.parse(params.page).id;
          this.editingWidgets = JSON.parse(params.page).widgets;
        }
      }
    );
  }

  getIndex() {
    this.zindex_init += this.zindex_add;
    const cls = {
      'z-index': this.zindex_init
    }
  }
}
