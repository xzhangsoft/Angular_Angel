import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAngelPage, IAngelWidget, IAngelEvent } from './interface';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  content: any = {};
  getData(url: string) {
    return this.http.get<any>(url);
  }

  getContent(url = '/assets/static/content.json') {
    // 此处url应该单独建立一个constant文件来存
    // 此方法被多次调用了，而且每次返回的数据其实是一样的，应该做缓存
    if (this.content) {
      return of(this.content);
    }
    return this.http.get<any>(url).pipe(tap(content => this.content = content));
  }

  getPageMetadata() {
    const localStoragePageConfig = localStorage.getItem('pageMetadata');
    return localStoragePageConfig ? _.get(JSON.parse(localStoragePageConfig), 'angel') : [];
  }

  updatePageMetadata(pageConfig: IAngelPage[]): boolean {
    try {
      localStorage.setItem(
        'pageMetadata',
        JSON.stringify({ angel: pageConfig })
      );
      return true;
    } catch (e) {
      console.error('Angel == update page config failed! ==');
      return false;
    }
  }

  updateEventConfig(eventConfig: IAngelEvent[]) {
    try {
      localStorage.setItem(
        'eventMetadata',
        JSON.stringify({ angel: eventConfig })
      );
      return true;
    } catch (e) {
      console.error('Angel == update event config failed! ==');
      return false;
    }
  }

  getEventConfig(): IAngelEvent[] {
    return localStorage.getItem('eventMetadata') ? _.get(JSON.parse(localStorage.getItem('eventMetadata')), 'angel') : [];
  }

  getEventConfigById(id: string): IAngelEvent {
    const localStorageEventConfig = JSON.parse(localStorage.getItem('eventMetadata'));
    if (localStorageEventConfig.length !== 0) {
      localStorageEventConfig.find((data: IAngelEvent) => {
        if (data.widgetId === id) {
          return data;
        } else {
          return null;
        }
      });
    } else {
      return null;
    }
  }
}
