
type NodeType = {
    isinstance: boolean,
    isentity: boolean,
    name: string,
    level: number,
    isexpandable: boolean
}


export default class Node {

    static paddingPerLevel: number = 30;
    public isexpandable: boolean;
    public name: string;
    public level: number;
    public isinstance: boolean;
    public isentity: boolean;

    constructor(node: NodeType) {
        this.isinstance = node.isinstance;
        this.isentity = node.isentity;
        this.name = node.name;
        this.isexpandable = node.isexpandable;
        this.level = node.level;
    }

}
