import * as React                   from 'react';
import { Cell, Grid }               from 'react-mdl';
import { connect }                  from 'react-redux';

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
    children: number[];
    id: number;
    isexpanded: boolean;
    isinstance: boolean;
    mentioncount: number;
    name: string;
    parent: number;
    selectionState: SelectionState;
}

export class UnconnectedNode extends React.Component<IExtraProps & INode, {}> {
    constructor() {
        super();
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                children: [],
                id: dbid,
                isexpanded: false,
                isinstance: false
            };
        } else {
            return {
                children: state.nodes[dbid].children,
                id: state.nodes[dbid].id,
                isexpanded: state.nodes[dbid].isexpanded,
                isinstance: state.nodes[dbid].isinstance
            };
        }
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

// // Export just the connected component
export const Node = connect(UnconnectedNode.mapStateToProps)(UnconnectedNode);
