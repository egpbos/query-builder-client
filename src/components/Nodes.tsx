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
            return <Node {...node} />;
        });

        return (
            <div>
                {nodes}
            </div>
        );
    }
}
