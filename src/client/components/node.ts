
type NodeType = {
    isinstance: boolean,
    isentity: boolean,
    name: string,
    level: number,
    isexpandable: boolean,
    isexpanded: boolean
}



export default class Node {

    static paddingPerLevel: number = 30;
    public isexpandable: boolean;
    public isexpanded: boolean;
    public name: string;
    public level: number;
    public isinstance: boolean;
    public isentity: boolean;

    constructor(node: NodeType) {
        if ((node.isentity && !node.isinstance) || (!node.isentity && node.isinstance)) {
            // pass
        } else {
            throw new Error('isentity and isinstance cannot both be false or true');
        }
        this.isinstance = node.isinstance;
        this.isentity = node.isentity;
        this.name = node.name;
        this.isexpandable = node.isexpandable;
        this.isexpanded = node.isexpanded;
        this.level = node.level;
    }


    public clone(): Node {
        let node: NodeType = {
            isexpandable: this.isexpandable,
            isexpanded: this.isexpanded,
            name: this.name,
            level: this.level,
            isinstance: this.isinstance,
            isentity: this.isentity
        };
        return new Node(node);
    }


    public onClickHandler(event:any) {
        console.log(event, name);
    }


}
