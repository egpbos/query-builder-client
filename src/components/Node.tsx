import * as React                   from 'react';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { expandButtonWasClicked }   from '../actions';
import { selectionWasClicked }      from '../actions';
import { childrenRequestedThunk }   from '../actions';

import Checkbox                     from '../Checkbox/Checkbox';
import { Button, Cell, Grid }       from 'react-mdl';

import { IStore }                   from '../interfaces';
import { SelectionState }           from '../interfaces';

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

interface INodeDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
    toggleSelection: (id: number) => void;
}

export class UnconnectedNode extends React.Component<IExtraProps & INode & INodeDispatchProps, {}> {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onClickSelect = this.onClickSelect.bind(this);
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        const dbid = ownProps.nodeID;

        if (state.nodes[dbid] === undefined) {
            return {
                children: [],
                id: dbid,
                isexpanded: false,
                isinstance: false,
                mentioncount: 0,
                name: 'undefined',
                nodeID: dbid,
                parent: 1,
                selectionState: SelectionState.Unselected
            };
        } else {
            return {
                children: state.nodes[dbid].children,
                id: state.nodes[dbid].id,
                isexpanded: state.nodes[dbid].isexpanded,
                isinstance: state.nodes[dbid].isinstance,
                mentioncount: state.nodes[dbid].mentioncount,
                name: state.nodes[dbid].name,
                nodeID: dbid,
                parent: state.nodes[dbid].childof,
                selectionState: state.nodes[dbid].selectionState
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
            },
            toggleSelection: (id: number) => {
                dispatch(selectionWasClicked(id));
            }
        };
    }

    public onClick() {
        this.props.fetchChildren(this.props.id);
        this.props.onClickExpand(this.props.id);
    }

    public onClickSelect() {
        this.props.toggleSelection(this.props.id);
    }

    render() {
        if (this.props.isinstance) {
            return (
                <Cell col={2}>
                    <Button raised accent={this.props.selectionState === SelectionState.Selected} onClick={this.onClickSelect}>
                        {this.props.name}
                    </Button>
                </Cell>
            );
        } else {
            if (this.props.isexpanded) {
                let childNodes: JSX.Element[] = [];
                if (this.props.children !== undefined) {
                    const temp: number[] = this.props.children;
                    childNodes = temp.map((child: number) =>
                        <Node key={child} nodeID={child} />// tslint:disable-line
                    );
                }
                return (
                    <Grid className={'mdl-cell--12-col category'}>
                        <Cell col={12} className="categoryTitleBar" onClick={this.onClick}>
                            <span className="categoryText">
                                {this.props.name}
                            </span>
                            <span>
                                <Checkbox
                                    id={'checkbox-node_' + this.props.id}
                                    ripple={true}
                                    indeterminate={this.props.selectionState === SelectionState.Partial}
                                    checked={this.props.selectionState === SelectionState.Selected}
                                    onClick={this.onClickSelect}
                                />
                            </span>
                        </Cell>
                        {childNodes}
                    </Grid>
                );
            } else {
                return (
                    <Grid className={'mdl-cell--12-col category'}>
                        <Cell col={12} className="categoryTitleBar" onClick={this.onClick}>
                            <span className="categoryText">
                                {this.props.name}
                            </span>
                            <span>
                                <Checkbox
                                    id={'checkbox-node_' + this.props.id}
                                    ripple={true}
                                    indeterminate={this.props.selectionState === SelectionState.Partial}
                                    checked={this.props.selectionState === SelectionState.Selected}
                                    onClick={this.onClickSelect}
                                />
                            </span>
                        </Cell>
                    </Grid>
                );
            }
        }
    }
}

// Export just the connected component
export const Node = connect(UnconnectedNode.mapStateToProps,
                            UnconnectedNode.mapDispatchToProps)(UnconnectedNode);
