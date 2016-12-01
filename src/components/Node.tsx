import * as React          from 'react';

import { INode }           from '../interfaces';

import './node.css';

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

export class Node extends React.Component<INode & INodeDispatchProps, {}> {

    constructor() {
        super();

        this.expand = this.expand.bind(this);
        this.fetchChildren = this.fetchChildren.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    public expand() {
        this.props.onClickExpand(this.props.id);
    }

    public fetchChildren() {
        this.props.fetchChildren(this.props.id);
    }

    public onClick() {
        const {isleaf, isexpanded} = this.props;
        if (isleaf !== true && isexpanded === false) {
            this.expand();
            this.fetchChildren();
        } else if (isleaf !== true && isexpanded === true) {
            console.error('this.collapse();');
        } else {
            // do nothing
        }
    }

    public render() {
        const {level, isentity, isinstance, isleaf, isexpanded, name} = this.props;

        const indent = {
            paddingLeft: (level * 30).toString() + 'px'
        };

        let nodeclass: string;
        if (isentity === true) {
            nodeclass = 'entity';
        } else if (isinstance === true) {
            nodeclass = 'instance';
        } else {
            throw new Error('Apparently, node is not an instance and not ' +
                ' an entity...this should not happen.');
        }

        let bullet: string;
        if (isleaf !== true && isexpanded === false) {
            bullet = '+';
        } else {
            bullet = '\u2022';
        }
        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" onClick={this.onClick} >
                    {bullet}
                </div>
                <div className="content" >
                    {name}
                </div>
            </div>
        );
    }
}
