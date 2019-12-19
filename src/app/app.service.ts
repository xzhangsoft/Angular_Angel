import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAngelPage, IAngelWidget, IAngelEvent } from './interface';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  getData(url: string) {
    return this.http.get<any>(url);
  }

  getContent(url = '/assets/static/content.json') {
    return this.http.get<any>(url);
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

  getPageConfigById(pageId: string) {
    try {
      const localStoragePageConfig = JSON.parse(localStorage.getItem('pageMetadata')).angel;
      if (localStoragePageConfig.length !== 0) {
        return localStoragePageConfig.find((data: IAngelPage) => {
          if (data.id === pageId) {
            return data;
          } else {
            return null;
          }
        });
      }
    } catch (e) {
      return null;
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

  getEventConfigById(widgetId: string): IAngelEvent {
    try {
      const localStorageEventConfig = JSON.parse(localStorage.getItem('eventMetadata')).angel;
      if (localStorageEventConfig.length !== 0) {
        return localStorageEventConfig.find((data: IAngelEvent) => {
          if (data.widgetId === widgetId) {
            return data;
          } else {
            return null;
          }
        });
      }
    } catch (e) {
      return null;
    }
  }
}
