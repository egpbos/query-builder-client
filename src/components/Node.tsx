import * as React from 'react';

import { TNode }  from '../types';

import './node.css';

export class Node extends React.Component<TNode, any> {

    constructor() {
        super();
    }

    public render() {
        console.log(this.props.dbrecord);
        const {bullet, indent, name, nodeclass, onclick} = this.props;
        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" onClick={onclick}>
                    {bullet}
                </div>
                <div className="content" >
                    {name}
                </div>
            </div>
        );
    }
}
