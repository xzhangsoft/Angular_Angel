export interface IAngelPage {
    id?: string;
    widgets?: IAngelWidget[];
    event?: IAngelEvent;
    hasBottomBtn?: boolean;
}

export interface IAngelWidget {
    id: string;
    widgetRef: string;
    fields: any;
}

export interface IAngelEvent {
    widgetId?: string;
    targetPage?: string;
}

