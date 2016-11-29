import * as React     from 'react';

import { TDatabaseRecord } from '../types';

import './node.css';

interface INodeOwnProps {
    dbrecord: TDatabaseRecord;
    indent: any;
    isexpanded: boolean;
    name: string;
    nodeclass: string;
}
interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
}

export class Node extends React.Component<INodeOwnProps & INodeDispatchProps, any> {

    static propTypes = {
        onClickExpand: React.PropTypes.func
    };

    constructor() {
        super();
        this.expand = this.expand.bind(this);
        this.fetchChildren = this.fetchChildren.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    public expand() {
        this.props.onClickExpand(this.props.dbrecord.id);
    }

    public fetchChildren() {
        //
    }

    public onClick() {
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
