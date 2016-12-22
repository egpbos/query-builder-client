import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { expandButtonWasClicked }   from '../actions';
import { childrenRequestedThunk }   from '../actions';

import { IStore }                   from '../interfaces';

import './nodeCategory.css';

interface IExtraProps {
    table: string;
    nodeID: number;
}

export interface INodeCategory {
    id: number;
    mentioncount: number;
    name: string;
}

interface INodeDispatchProps {
    onClickExpand: (table: string, id: number) => void;
    fetchChildren: (table: string, id: number) => void;
}

export class UnconnectedNodeCategory extends React.Component<IExtraProps & INodeCategory & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
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
                mentioncount: 0,
                name: 'undefined'
            };
        } else {
            return {
                nodeID: dbid,

                id: nodes[dbid].id,
                mentioncount: nodes[dbid].mentioncount,
                name: nodes[dbid].name
            };
        }
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            onClickExpand: (table: string, id: number) => {
                dispatch(expandButtonWasClicked(table, id));
            },
            fetchChildren: (table: string, id: number) => {
                dispatch(childrenRequestedThunk(table, id));
            }
        };
    }

    public onClick() {
        this.props.fetchChildren(this.props.table, this.props.id);
        this.props.onClickExpand(this.props.table, this.props.id);
    }

    render() {
        return (
            <span className="categoryText" onClick={this.onClick}>
                {this.props.name}
            </span>
        );
    }
}

// Export just the connected component
export const NodeCategory = connect(UnconnectedNodeCategory.mapStateToProps,
                                    UnconnectedNodeCategory.mapDispatchToProps)(UnconnectedNodeCategory);
