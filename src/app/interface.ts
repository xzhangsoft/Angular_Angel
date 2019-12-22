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
    widgetId?: string;
    targetPage?: string;
    flowType?: string;
}

