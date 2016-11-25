export interface IDatabaseRecord {
    child_of: number;
    id: number;
    is_entity: boolean;
    is_expandable: boolean;
    is_instance: boolean;
    level: number;
    mention_count: number;
    name: string;
    url: string;
}

export interface INode {
    bullet: string;
    dbrecord: IDatabaseRecord;
    id: number;
    isexpanded: boolean;
    indent: any;
    key: number;
    name: string;
    nodeclass: string;
    onclick: (id: number) => void;
}

export interface IStore {
    nodes: INode[];
}
