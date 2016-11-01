import * as React from 'react';
import Node from './node';

type props = {
    node: Node
};
type state = {
};

export default class NodeRender extends React.Component<props, state> {

    constructor () {
        super();
    }


    public determineNodeClass(node: Node): string {

        let nodeclass = '';
        if (node.isinstance) {
            nodeclass += 'instance';
        } else if (node.isentity) {
            nodeclass += 'entity';
        } else {
            throw new Error('Unknown clause');
        }
        return nodeclass;
    }


    public render() {

        let node = this.props.node;

        let indent = {'paddingLeft': (Node.paddingPerLevel * node.level).toString() + 'px'};

        let nodeclass = this.determineNodeClass(node);

        let tsx = (
            <div className={nodeclass} style={indent}>
                <div className='bullet' onClick={() => node.onClickHandler(node.name)}>
                    {node.isexpandable ? '+' : '\u2022'}
                </div>
                <div className='content' >
                    {node.name}
                </div>
            </div>
        );
        return tsx;
    }

}


