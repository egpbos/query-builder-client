import * as React     from 'react';

import { TNode }      from '../types';

import './node.css';

export class Node extends React.Component<TNode, any> {

    // static propTypes = {
    //     expand: React.PropTypes.func.isRequired
    // };
    // 
    constructor() {
        super();
        this.expand = this.expand.bind(this);
        this.fetchChildren = this.fetchChildren.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    public expand() {
        console.log('from Node.expand():', this.props);
        //this.props.expand(this.props.dbrecord.id);
    }

    public fetchChildren() {
        console.log('from Node.fetchChildren():', this.props);
    }

    public onClick() {
        console.log('from Node.onClick():', this.props);
        const {dbrecord, isexpanded} = this.props;
        if (dbrecord.is_expandable && isexpanded === false) {
            this.expand();
            this.fetchChildren();
        } else if (dbrecord.is_expandable && isexpanded === true) {
            console.log('this.collapse();');
        } else {
            // do nothing
        }
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
