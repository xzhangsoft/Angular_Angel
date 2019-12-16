import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAngelPage, IAngelWidget, IAngelEvent } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getData(url: string) {
    return this.http.get<any>(url);
  }

  getContent(url = '/assets/static/content.json') {
    return this.http.get<any>(url);
  }

  getPageMetadata() {
    const localStoragePageConfig = localStorage.getItem('pageMetadata');
    return localStoragePageConfig ? JSON.parse(localStoragePageConfig) : '';
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
    return JSON.parse(localStorage.getItem('eventMetadata'));
  }

  getEventConfigById(id: string): IAngelEvent {
    const localStorageEventConfig = JSON.parse(localStorage.getItem('eventMetadata'));
    if (localStorageEventConfig.length !== 0) {
      localStorageEventConfig.find((data: IAngelEvent) => {
        if (data.currentPageId === id) {
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
