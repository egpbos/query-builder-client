import * as React from 'react';

import { INode }  from '../interfaces';

import './node.css';

export class Node extends React.Component<INode, any> {

    constructor() {
        super();
    }

    public render() {
        console.log(this.props.dbrecord);
        const bullet = this.props.bullet;
        const indent = this.props.indent;
        const name = this.props.name;
        const nodeclass = this.props.nodeclass;
        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" >
                    {bullet}
                </div>
                <div className="content" >
                    {name}
                </div>
            </div>
        );
    }
}
