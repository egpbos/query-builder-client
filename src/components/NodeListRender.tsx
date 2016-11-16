import * as React     from 'react';
import { Dispatch }   from 'redux';

import { Action }     from '../Action';
import { Node }       from '../Node';
import { NodeRender } from './NodeRender';

type props = {
    nodes: Node[];
    dispatch: Dispatch<Action>;
};
type state = {
};

export class NodeListRender extends React.Component<props, state> {

    constructor () {
        super();
    }

    public render() {

        const nodeList = this.props.nodes.map((node: Node, nodeindex: number) => {
            return <NodeRender node={node} key={nodeindex} dispatch={this.props.dispatch}/>;
        });

        return (
            <div>
                {nodeList}
            </div>
        );

    }

}
