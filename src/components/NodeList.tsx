import * as React    from 'react';

import { INode }     from '../interfaces';
import { Node }      from './Node';

type props = {
    nodelist: INode[];
}

export class NodeList extends React.Component<props, any> {

    constructor() {
        super();
    }

    render() {
        const nodelist = this.props.nodelist.map((node: INode) => {
            return <Node {...node} />;
        });

        return (
            <div>
                {nodelist}
            </div>
        );
    }
}
