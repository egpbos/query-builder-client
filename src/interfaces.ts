export interface IDatabaseRecord {
    childof: number;
    id: number;
    isentity: number;
    isinstance: number;
    isleaf: number;
    level: number;
    mentioncount: number;
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
