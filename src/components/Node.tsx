import * as React     from 'react';

import { TDatabaseRecord } from '../types';

import './node.css';

interface INodeOwnProps {
    dbrecord: TDatabaseRecord;
    isexpanded: boolean;
}
interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

export class Node extends React.Component<INodeOwnProps & INodeDispatchProps, any> {

    static propTypes = {
        onClickExpand: React.PropTypes.func,
        fetchChildren: React.PropTypes.func
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
        this.props.fetchChildren(this.props.dbrecord.id);
    }

    public onClick() {
        const {dbrecord, isexpanded} = this.props;
        if (dbrecord.is_expandable && isexpanded === false) {
            this.expand();
            this.fetchChildren();
        } else if (dbrecord.is_expandable && isexpanded === true) {
            console.error('this.collapse();');
        } else {
            // do nothing
        }
    }

    public render() {
        const {dbrecord, isexpanded} = this.props;

        const indent = {
            paddingLeft: (dbrecord.level * 30).toString() + 'px'
        };

        let nodeclass: string;
        if (dbrecord.is_entity === true) {
            nodeclass = 'entity';
        } else if (dbrecord.is_instance === true) {
            nodeclass = 'instance';
        } else {
            throw new Error('Apparently, node is not an instance and not ' +
                ' an entity...this should not happen.');
        }

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
                    {dbrecord.name}
                </div>
            </div>
        );
    }
}
