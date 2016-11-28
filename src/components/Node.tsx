import * as React     from 'react';

import { TNode }      from '../types';

import './node.css';

export class Node extends React.Component<TNode, any> {

    constructor() {
        super();
    }

    public render() {
        const {dbrecord, indent, isexpanded, name, nodeclass} = this.props;

        let bullet: string;
        if (dbrecord.is_expandable && isexpanded === false) {
            bullet = '+';
        } else {
            bullet = '\u2022';
        }
        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" onClick={() => {console.log('clicked id = ', dbrecord.id); console.log(this.props); }} >
                    {bullet}
                </div>
                <div className="content" >
                    {name}
                </div>
            </div>
        );
    }
}
