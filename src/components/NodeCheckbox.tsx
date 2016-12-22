import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { selectionWasClicked }      from '../actions';

import Checkbox                     from '../Checkbox/Checkbox';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import './nodeCheckbox.css';

interface IExtraProps {
    nodeID: number;
}

interface INodeDispatchProps {
    toggleSelection: (id: number) => void;
}

export interface INodeCheckbox {
    id: number;
    selectionState: SelectionState;
}

export class UnconnectedNodeCheckbox extends React.Component<IExtraProps & INodeCheckbox & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                id: dbid,
                nodeID: dbid,
                selectionState: SelectionState.Unselected
            };
        } else {
            return {
                id: state.nodes[dbid].id,
                nodeID: dbid,
                selectionState: state.nodes[dbid].selectionState
            };
        }
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            toggleSelection: (id: number) => {
                dispatch(selectionWasClicked(id));
            }
        };
    }

    public onClick() {
        this.props.toggleSelection(this.props.id);
    }

    render() {
        return (
            <span>
                <Checkbox
                    id={'checkbox-node_' + this.props.id}
                    ripple={true}
                    indeterminate={this.props.selectionState === SelectionState.Partial}
                    checked={this.props.selectionState === SelectionState.Selected}
                    onClick={this.onClick}
                />
            </span>
        );
    }
}

// Export just the connected component
export const NodeCheckbox = connect(UnconnectedNodeCheckbox.mapStateToProps,
                                    UnconnectedNodeCheckbox.mapDispatchToProps)(UnconnectedNodeCheckbox);
