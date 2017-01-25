import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { selectionWasClicked }      from '../actions';

import { Button }                   from 'react-mdl';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import './nodeInstance.css';

interface IExtraProps {
    table: string;
    nodeID: number;
}

interface INodeDispatchProps {
    toggleSelection: (table: string, id: number) => void;
}

export interface INodeInstance {
    id: number;
    name: string;
    selectionState: SelectionState;
}

export class UnconnectedNodeInstance extends React.Component<IExtraProps & INodeInstance & INodeDispatchProps, { }> {
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
                name: 'undefined',
                selectionState: SelectionState.Unselected
            };
        } else {
            return {
                nodeID: dbid,

                id: nodes[dbid].id,
                name: nodes[dbid].name,
                selectionState: nodes[dbid].selectionState
            };
        }
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            toggleSelection: (table: string, id: number) => {
                dispatch(selectionWasClicked(table, id));
            }
        };
    }

    public onClickSelect() {
        this.props.toggleSelection(this.props.table, this.props.id);
    }

    render() {
        return (
            <Button raised colored={ this.props.selectionState === SelectionState.Selected } onClick={ this.onClickSelect }>
                { this.props.name }
            </Button>
        );
    }
}

// Export just the connected component
export const NodeInstance = connect(UnconnectedNodeInstance.mapStateToProps,
                                    UnconnectedNodeInstance.mapDispatchToProps)(UnconnectedNodeInstance);
