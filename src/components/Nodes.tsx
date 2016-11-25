import * as React    from 'react';

import { TNode }     from '../types';
import { Node }      from './Node';

type TProps = {
    nodes: TNode[];
}

export class Nodes extends React.Component<TProps, any> {

    constructor() {
        super();
    }

    render() {
        const nodes = this.props.nodes.map((node: TNode) => {
            const onclick = () => {
                console.log('should dispatch an action to expand the Node ' +
                    'with dbrecord.id === ' + node.dbrecord.id.toString());
            };
            return <Node {...node} onclick={onclick}/>;
        });

        return (
            <div>
                {nodes}
            </div>
        );
    }
}
