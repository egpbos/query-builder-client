import * as React from 'react';

import './nodeCategory.css';

interface INodeCategory {
    id: number;
    name: string;
}

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

export class NodeCategory extends React.Component<INodeCategory & INodeDispatchProps, {}> {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    public onClick() {
        this.props.fetchChildren(this.props.id);
        this.props.onClickExpand(this.props.id);
    }

    render() {
        return (
            <span className="categoryText" onClick={this.onClick}>
                {this.props.name}
            </span>
        );
    }
}
