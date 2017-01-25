import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { selectionWasClicked }      from '../actions';
import { buildQuery }               from '../actions';

import Checkbox                     from '../Checkbox/Checkbox';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import './nodeCheckbox.css';

interface IExtraProps {
    table: string;
    nodeID: number;
}

interface INodeDispatchProps {
    buildQuery: () => void;
    toggleSelection: (table: string, id: number) => void;
}

export interface INodeCheckbox {
    id: number;
    selectionState: SelectionState;
}

export class UnconnectedNodeCheckbox extends React.Component<IExtraProps & INodeCheckbox & INodeDispatchProps, { }> {
    constructor() {
        super();

        this.onClickSelect = this.onClickSelect.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        let nodes : any;
        if (ownProps.table === 'entities') {
            nodes = state.entities;
        } else if (ownProps.table === 'events') {
            nodes = state.events;
        } else if (ownProps.table === 'sources') {
            nodes = state.sources;
        } else if (ownProps.table === 'topics') {
            nodes = state.topics;
        }

        if (nodes[dbid] === undefined) {
            return {
                nodeID: dbid,

                id: dbid,
                selectionState: SelectionState.Unselected
            };
        } else {
            return {
                nodeID: dbid,

                id: nodes[dbid].id,
                selectionState: nodes[dbid].selectionState
            };
        }
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            buildQuery: () => {
                dispatch(buildQuery());
            },
            toggleSelection: (table: string, id: number) => {
                dispatch(selectionWasClicked(table, id));
            }
        };
    }

    public onClickSelect() {
        this.props.toggleSelection(this.props.table, this.props.id);
        this.props.buildQuery();
    }

    render() {
        return (
            <span>
                <Checkbox
                    id={ 'checkbox-node_' + this.props.id }
                    ripple={ true }
                    indeterminate={ this.props.selectionState === SelectionState.Partial }
                    checked={ this.props.selectionState === SelectionState.Selected }
                    onClick={ this.onClickSelect }
                />
            </span>
        );
    }
}

// Export just the connected component
export const NodeCheckbox = connect(UnconnectedNodeCheckbox.mapStateToProps,
                                    UnconnectedNodeCheckbox.mapDispatchToProps)(UnconnectedNodeCheckbox);
