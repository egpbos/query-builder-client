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

    public render() {

        const nodeList = this.props.nodes.map((node: NodeLogic) => {
            return <NodeRender node={node} key={node.dbrecord.id} dispatch={this.props.dispatch}/>;
        });

        return (
            <div className={'mdl-grid content-grid'}>
                {nodeList}
            </div>
        );

    }

}
