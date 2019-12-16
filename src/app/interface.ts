export interface IAngel {
    pageMetadata: IAngelPage;
}

export interface IAngelPage {
    id?: string;
    widgets?: IAngelWidget[];
    event?: IAngelEvent;
}

export interface IAngelWidget {
    id: string;
    widgetRef: string;
    fields: any;
}

export interface IAngelEvent {
    currentPageId: string;
    targetPage: string;
}

