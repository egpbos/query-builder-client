import * as React from 'react';
import { INode }  from '../interfaces';

export class Node extends React.Component<INode, any> {

    constructor() {
        super();
    }

    public render() {
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
