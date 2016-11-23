import * as React         from 'react';
import { Dispatch }       from 'redux';

import { Action }         from '../Action';
import { NodeLogic }      from './NodeLogic';
import './node.css';

type props = {
    node: NodeLogic,
    dispatch: Dispatch<Action>
};
type state = {
};

export class NodeRender extends React.Component<props, state> {

    constructor () {
        super();
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    public onClickHandler() {
        const node = this.props.node;
        const toggleExpandAction = {
            type: 'TOGGLE_ISEXPANDED',
            payload: node.dbrecord.id
        };
        this.props.dispatch(toggleExpandAction);

        if (node.isexpanded === false) {
            const fetchChildNodesAction = {
                type: 'FETCH_CHILD_NODES',
                payload: {
                    node,
                    dispatch: this.props.dispatch
                }
            };
            this.props.dispatch(fetchChildNodesAction);
        }
    }

    public render() {

        const node = this.props.node;
        const indent = {paddingLeft: (NodeLogic.paddingPerLevel * node.dbrecord.level).toString() + 'px'};
        const nodeclass = node.getClass();
        let bullet: string;
        if (node.dbrecord.is_expandable && !node.isexpanded) {
            bullet = '+';
        } else {
            bullet = '\u2022';
        }

        return (
            <div className={nodeclass} style={indent}>
                <div className="bullet" onClick={this.onClickHandler}>
                    {bullet}
                </div>
                <div className="content" >
                    {node.dbrecord.name}
                </div>
            </div>
        );
    }
}
