import * as React                   from 'react';
import { connect }                  from 'react-redux';

import { Cell, Grid }               from 'react-mdl';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

import { NodeCategory }             from './NodeCategory';
import { NodeCheckbox }             from './NodeCheckbox';
import { NodeInstance }             from './NodeInstance';

import './node.css';

interface IExtraProps {
    table: string;
    nodeID: number;
}

export interface INode {
    children: number[];
    id: number;
    isexpanded: boolean;
    isinstance: boolean;
    mentioncount: number;
    name: string;
    parent: number;
    selectionState: SelectionState;
    highlighted: boolean;
}

export class UnconnectedNode extends React.Component<IExtraProps & INode, {}> {
    constructor() {
        super();
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
                children: [],
                id: dbid,
                isexpanded: false,
                isinstance: false,
                mentioncount: 0,
                name: 'undefined',
                nodeID: dbid,
                parent: -1,
                selectionState: SelectionState.Unselected,
                highlighted: false
            };
        } else {
            return {
                children: nodes[dbid].children,
                id: nodes[dbid].id,
                isexpanded: nodes[dbid].isexpanded,
                isinstance: nodes[dbid].isinstance,
                mentioncount: nodes[dbid].mentioncount,
                name: nodes[dbid].name,
                nodeID: dbid,
                parent: nodes[dbid].childof,
                selectionState: nodes[dbid].selectionState,
                highlighted: nodes[dbid].highlighted
            };
        }
    }

    render() {
        if (this.props.isinstance) {
            return (
                <Cell col={6}>
                    <NodeInstance table={this.props.table} nodeID={this.props.id} />
                </Cell>
            );
        } else {
            let childNodes: JSX.Element[] = [];
            if (this.props.children !== undefined) {
                const temp: number[] = this.props.children;
                childNodes = temp.map((child: number) =>
                    <Node key={child} table={this.props.table} nodeID={child} />// tslint:disable-line
                );
            }
            return (
                <Grid className={this.props.highlighted ? 'mdl-cell--12-col category highlighted' : 'mdl-cell--12-col category'}>
                    <Cell col={12} className="categoryTitleBar">
                        <NodeCheckbox table={this.props.table} nodeID={this.props.id} />
                        <NodeCategory table={this.props.table} nodeID={this.props.id} />
                    </Cell>
                    {this.props.isexpanded && (childNodes.length > 0) ? childNodes : <div />}
                </Grid>
            );
        }
    }
}

// Export just the connected component
export const Node = connect(UnconnectedNode.mapStateToProps)(UnconnectedNode);
