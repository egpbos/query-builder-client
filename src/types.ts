export type TDatabaseRecord = {
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

export type TNode = {
    dbrecord: TDatabaseRecord;
    indent: any;
    isexpanded: boolean;
    name: string;
    nodeclass: string;
}

export type TStore = {
    nodes: TNode[]
}
