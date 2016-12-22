export enum SelectionState {
    Unselected,
    Partial,
    Selected,
}

export interface IDatabaseRecord {
    childof:        number;
    id:             number;
    isentity:       number;
    isinstance:     number;
    isleaf:         number;
    level:          number;
    mentioncount:   number;
    name:           string;
    url:            string;
}

export interface IStore {
    nodes: any;
}
