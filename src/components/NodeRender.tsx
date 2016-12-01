import * as React         from 'react';
import { Dispatch }       from 'redux';
import { Grid, Cell, Button }       from 'react-mdl';
import Checkbox       from '../Checkbox/Checkbox';

import { Action }         from '../Action';
import { NodeLogic }      from './NodeLogic';
import { SelectionState } from './NodeLogic';

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
        this.onCheckboxClickHandler = this.onCheckboxClickHandler.bind(this);
    }

    public onClickHandler() {
        const node = this.props.node;

        if (node.dbrecord.is_expandable) {
            const toggleExpandAction = {
                type: 'TOGGLE_ISEXPANDED',
                payload: node.dbrecord.id
            };
            this.props.dispatch(toggleExpandAction);
        } else {
            const toggleSelectedAction = {
                type: 'TOGGLE_ISSELECTED',
                payload: node.dbrecord.id
            };
            this.props.dispatch(toggleSelectedAction);

            if (node.parent !== null) {
                const informParentSelectionChangeAction = {
                    type: 'CHILD_SELECTION_CHANGE',
                    payload: node.parent.dbrecord.id
                };
                this.props.dispatch(informParentSelectionChangeAction);
            }
        }

        if (node.dbrecord.is_expandable && node.isexpanded === false) {
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

    public onCheckboxClickHandler(event: any) {
        const node = this.props.node;
        event.stopPropagation();

        const toggleMassSelectedAction = {
            type: 'TOGGLE_MASSSELECTED',
            payload: node.dbrecord.id
        };
        this.props.dispatch(toggleMassSelectedAction);
    }

    public render() {
        const node = this.props.node;
        if (node.dbrecord.is_expandable) {
            return (
                <Cell col={12}>
                    <Grid>
                        <Cell col={1} />
                        <Cell col={11}>
                            <Grid>
                                <Cell col={12} className="category" onClick={this.onClickHandler}>
                                    <span className="categoryText">
                                        {node.dbrecord.name}
                                    </span>
                                    <span className="allSelector">
                                        <Checkbox
                                            id={'checkbox-all_' + node.dbrecord.id}
                                            ripple={true}
                                            indeterminate={node.selectedState === SelectionState.Partial}
                                            checked={node.selectedState === SelectionState.Selected}
                                            onClick={this.onCheckboxClickHandler}
                                        />
                                    </span>
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                </Cell>
            );
        } else {
            return (
                <Cell col={2}>
                    <Button raised accent={node.selectedState === SelectionState.Selected} onClick={this.onClickHandler}>
                        {node.dbrecord.name}
                    </Button>
                </Cell>
            );
        }
    }
}
