export interface INode {
    bullet: string;
    id: number;
    indent: any;
    key: number;
    name: string;
    nodeclass: string;
    onclick: (id: number) => void;
}
