import * as React         from 'react';
import { Dispatch }       from 'redux';

import { Action }         from '../Action';
import { DatabaseRecord } from '../DatabaseRecord';
import { Node }           from '../Node';

type props = {
    node: Node,
    dispatch: Dispatch<Action>
};
type state = {
};

export class NodeRender extends React.Component<props, state> {

    constructor () {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    public determineNodeClass(dbrecord: DatabaseRecord): string {

        let nodeclass = '';
        if (dbrecord.is_instance) {
            nodeclass += 'instance';
        } else if (dbrecord.is_entity) {
            nodeclass += 'entity';
        } else {
            throw new Error('Unknown clause');
        }
        return nodeclass;
    }

    public onClickHandler() {
        const node = this.props.node;
        console.log(node.dbrecord.name);
        const action = {
            type: 'TOGGLE_ISEXPANDED',
            payload: node.dbrecord.id
        };
        this.props.dispatch(action);
    }

    public render() {

        const node = this.props.node;
        const indent = {paddingLeft: (Node.paddingPerLevel * node.dbrecord.level).toString() + 'px'};
        const nodeclass = this.determineNodeClass(node.dbrecord);

        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" onClick={this.onClickHandler}>
                    {node.dbrecord.is_expandable ? '+' : '\u2022'}
                </div>
                <div className="content" >
                    {node.dbrecord.name}
                </div>
            </div>
        );
    }
}
