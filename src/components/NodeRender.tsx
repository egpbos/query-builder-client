import * as React         from 'react';
import { Dispatch }       from 'redux';
import { Grid, Cell, Button }       from 'react-mdl';
import Checkbox       from '../Checkbox/Checkbox';

import { Action }         from '../Action';
import { NodeLogic }      from './NodeLogic';
import { SelectionState } from './NodeLogic';

import classNames from 'classnames';
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

    public onCheckboxClickHandler(event:any) {
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
        const level = node.dbrecord.level;
        // const nodeclass = node.getClass();

        // let bullet: string;
        // if (node.dbrecord.is_expandable && !node.isexpanded) {
        //     bullet = '+';
        // } else {
        //     bullet = '\u2022';
        // }

        if (node.dbrecord.is_expandable) {
            const indentClasses = classNames({
                'mdl-cell': (level != 0),
                'mdl-cell--1-col': (level == 1),
                'mdl-cell--2-col': (level == 2),
                'mdl-cell--3-col': (level == 3),
                'mdl-cell--4-col': (level == 4),
                'mdl-cell--5-col': (level == 5),
                'mdl-cell--6-col': (level == 6),
            });

            const contentClasses = classNames({
                'mdl-cell': true,
                'mdl-cell--12-col': (level == 0),
                'mdl-cell--11-col': (level == 1),
                'mdl-cell--10-col': (level == 2),
                'mdl-cell--9-col': (level == 3),
                'mdl-cell--8-col': (level == 4),
                'mdl-cell--7-col': (level == 5),
                'mdl-cell--6-col': (level == 6),
                'mdl-grid': true
            });

            // const nodeClasses = classNames({
            //     'mdl-cell': true,
            //     'mdl-cell--12-col': true,
            //     'mdl-button--colored': true,
            //     'mdl-button': true,
            //     'mdl-js-button': true,
            //     'mdl-button--raised': true
            // });

// onClick={this.onCheckboxClickHandler}>
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
                                        <Checkbox id={"checkbox-all_"+node.dbrecord.id} 
                                                  ripple={true}
                                                  indeterminate={node.selectedState === SelectionState.Partial} 
                                                  checked={node.selectedState === SelectionState.Selected} 
                                                  onClick={this.onCheckboxClickHandler}/>
                                    </span>
                                </Cell>
                            </Grid> 
                        </Cell>
                    </Grid>
                </Cell>
            );
        } else {
            const nodeClasses = classNames({
                'mdl-cell': true,
                'mdl-cell--2-col': true,
                'mdl-button': true,
                'mdl-js-button': true,
                'mdl-button--raised': true,
                'mdl-button--accent': node.selectedState === SelectionState.Selected
            });

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
