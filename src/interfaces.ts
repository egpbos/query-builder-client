export interface IDatabaseRecord {
    child_of: number;
    id: number;
    is_entity: number;
    is_expandable: number;
    is_instance: number;
    level: number;
    mention_count: number;
    name: string;
    url: string;
}

export interface INode {
    childof: number;
    id: number;
    isentity: boolean;
    isleaf: boolean;
    isinstance: boolean;
    level: number;
    mentioncount: number;
    name: string;
    url: string;
    isexpanded: boolean;
}

export interface IStore {
    nodes: INode[];
}
