import Node from './node';


export default class Entity extends Node {

    public isexpandable: boolean;

    constructor() {
        super();
        console.log('hello entity');
        this.isexpandable = true;
    }


}