import * as React from 'react';
import NodeRender from './node-render';
import Node       from './node';

type props = {
    nodes: Node[];
};
type state = {
};

export default class NodeListRender extends React.Component<props, state> {

    constructor () {
        super();
    }


    public render() {


        let nodeList = this.props.nodes.map((node:Node, nodeindex:number) => {
            return <NodeRender node={node} key={nodeindex} />;
        });

        let tsx = (
            <div>
                {nodeList}
            </div>
        );

        return tsx;
    }

}


