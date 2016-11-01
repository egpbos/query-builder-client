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


    public render() {

        let indent: number = Node.paddingPerLevel * this.props.node.level;
        let style = {'paddingLeft': indent.toString() + 'px'};
        let classes = 'node ';
        if (this.props.node.isinstance) {
            classes += 'instance';
        } else if (this.props.node.isentity) {
            classes += 'entity';
        } else {
            throw new Error('Unknown clause');
        }

        let tsx = (
            <div className={classes} style={style}>
                <div className='node-bullet'>
                    {this.props.node.isexpandable ? '+' : '\u2022'}
                </div>
                <div className='node-content' >
                    {this.props.node.name}
                </div>
            </div>
        );
        return tsx;
    }

}


