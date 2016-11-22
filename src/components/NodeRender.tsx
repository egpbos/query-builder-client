import * as React         from 'react';
import { Dispatch }       from 'redux';

import { Action }         from '../Action';
import { NodeLogic }      from './NodeLogic';

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
        const action = {
            type: 'TOGGLE_ISEXPANDED',
            payload: node.dbrecord.id
        };
        this.props.dispatch(action);
    }

    public render() {

        const node = this.props.node;
        const indent = {paddingLeft: (NodeLogic.paddingPerLevel * node.dbrecord.level).toString() + 'px'};
        const nodeclass = node.class();
        const bullet = node.dbrecord.is_expandable ? '+' : '\u2022';

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
