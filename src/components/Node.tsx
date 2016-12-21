import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { expandButtonWasClicked }   from '../actions';
import { childrenRequestedThunk }   from '../actions';

import { Cell, Grid }               from 'react-mdl';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import { NodeCategory }             from './NodeCategory';
import { NodeCheckbox }             from './NodeCheckbox';
import { NodeInstance }             from './NodeInstance';

import './node.css';

interface IExtraProps {
    nodeID: number;
}

export interface INode {
    parent: number;
    id: number;
    isentity: boolean;
    isleaf: boolean;
    isinstance: boolean;
    level: number;
    mentioncount: number;
    name: string;
    url: string;
    isexpanded: boolean;
    selectionState: SelectionState;
    children: number[];
}

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

export class UnconnectedNode extends React.Component<IExtraProps & INode & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                nodeID: dbid,

                parent: -1,
                id: dbid,
                isentity: false,
                isleaf: false,
                isinstance: false,
                level: 0,
                mentioncount: 0,
                name: 'undefined',
                url: 'un.defi.ned',
                isexpanded: false,
                selectionState: SelectionState.Unselected,
                children: []
            };
        } else {
            return {
                nodeID: dbid,

                parent: state.nodes[dbid].childof,
                id: state.nodes[dbid].id,
                isentity: state.nodes[dbid].isentity,
                isleaf: state.nodes[dbid].isleaf,
                isinstance: state.nodes[dbid].isinstance,
                level: state.nodes[dbid].level,
                mentioncount: state.nodes[dbid].mentioncount,
                name: state.nodes[dbid].name,
                url: state.nodes[dbid].url,
                isexpanded: state.nodes[dbid].isexpanded,
                selectionState: state.nodes[dbid].selectionState,
                children: state.nodes[dbid].children
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

    public onClick(e : any) {
        e.stopPropagation();
        console.log(this.props.id);

        this.props.fetchChildren(this.props.id);
        this.props.onClickExpand(this.props.id);
    }

    render() {
        if (this.props.isinstance) {
            return (
                <Cell col={2}>
                    <NodeInstance nodeID={this.props.id} />
                </Cell>
            );
        } else {
            let childNodes: JSX.Element[] = [];
            if (this.props.children !== undefined) {
                const temp: number[] = this.props.children;
                childNodes = temp.map((child: number) =>
                    <Node key={child} nodeID={child} />// tslint:disable-line
                );
            }
            return (
                <Grid className={'mdl-cell--12-col category'}>
                    <Cell col={12} className="categoryTitleBar">
                        <NodeCategory nodeID={this.props.id} />
                        <NodeCheckbox nodeID={this.props.id} />
                    </Cell>
                    {this.props.isexpanded && (childNodes.length > 0) ? childNodes : <div />}
                </Grid>
            );
        }
    }
}

// Export just the connected component
export const Node = connect(UnconnectedNode.mapStateToProps,
                            UnconnectedNode.mapDispatchToProps)(UnconnectedNode);
