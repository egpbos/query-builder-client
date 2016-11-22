import * as React     from 'react';
import { Dispatch }   from 'redux';

import { Action }     from '../Action';
import { NodeLogic }  from './NodeLogic';
import { NodeRender } from './NodeRender';

type props = {
    nodes: NodeLogic[];
    dispatch: Dispatch<Action>;
};
type state = {
};

export class NodeList extends React.Component<props, state> {

    constructor () {
        super();
    }

    public render() {

        const nodeList = this.props.nodes.map((node: NodeLogic, nodeindex: number) => {
            return <NodeRender node={node} key={nodeindex} dispatch={this.props.dispatch}/>;
        });

        return (
            <div>
                {nodeList}
            </div>
        );

    }

}
