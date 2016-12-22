import * as React                   from 'react';
import { Button }                   from 'react-mdl';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { selectionWasClicked }      from '../actions';
import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import './nodeInstance.css';

interface IExtraProps {
    nodeID: number;
}

interface INodeDispatchProps {
    toggleSelection: (id: number) => void;
}

export interface INodeInstance {
    id: number;
    name: string;
    selectionState: SelectionState;
}

export class UnconnectedNodeInstance extends React.Component<IExtraProps & INodeInstance & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClickSelect = this.onClickSelect.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                nodeID: dbid,

                id: dbid,
                name: 'undefined',
                selectionState: SelectionState.Unselected
            };
        } else {
            return {
                nodeID: dbid,

                id: state.nodes[dbid].id,
                name: state.nodes[dbid].name,
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

    public onClickSelect() {
        this.props.toggleSelection(this.props.id);
    }

    render() {
        return (
            <Button raised accent={this.props.selectionState === SelectionState.Selected} onClick={this.onClickSelect}>
                {this.props.name}
            </Button>
        );
    }
}

// Export just the connected component
export const NodeInstance = connect(UnconnectedNodeInstance.mapStateToProps,
                                    UnconnectedNodeInstance.mapDispatchToProps)(UnconnectedNodeInstance);
