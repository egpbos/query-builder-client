import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { expandButtonWasClicked }   from '../actions';
import { childrenRequestedThunk }   from '../actions';

import { IStore }                   from '../interfaces';

import './nodeCategory.css';

interface IExtraProps {
    nodeID: number;
}

export interface INodeCategory {
    id: number;
    mentioncount: number;
    name: string;
}

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

export class UnconnectedNodeCategory extends React.Component<IExtraProps & INodeCategory & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                nodeID: dbid,

                id: dbid,
                mentioncount: 0,
                name: 'undefined'
            };
        } else {
            return {
                nodeID: dbid,

                id: state.nodes[dbid].id,
                mentioncount: state.nodes[dbid].mentioncount,
                name: state.nodes[dbid].name
            };
        }
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            onClickExpand: (id: number) => {
                dispatch(expandButtonWasClicked(id));
            },
            fetchChildren: (id: number) => {
                dispatch(childrenRequestedThunk(id));
            }
        };
    }

    public onClick() {
        this.props.fetchChildren(this.props.id);
        this.props.onClickExpand(this.props.id);
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
