import * as React                       from 'react';
import { connect }                      from 'react-redux';
import { Dispatch }                     from 'redux';
import { Grid, Cell, Button }           from 'react-mdl';

import { expandButtonWasClicked }       from '../actions';
import { checkboxWasClicked }           from '../actions';
import { selectionWasClicked }          from '../actions';
import { childrenRequestedThunk }       from '../actions';
import { IGenericAction}                from '../actions';
import { Node }                         from '../components';
import { INode }                        from '../interfaces';
import { IStore }                       from '../interfaces';

interface IExtraProps {
    parentID: number;
}
interface IOwnProps {
    nodes: INode[];
}
interface IDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (parent: INode) => void;
    massSelection: (node: INode) => void;
    toggleSelection: (node: INode) => void;
}

export class UnconnectedNodes extends React.Component<IExtraProps & IOwnProps & IDispatchProps, {}> {
    constructor() {
        super();
    }

    static mapStateToProps(state: IStore, ownProps: IExtraProps) {
        return {
            parentID: ownProps.parentID,
            nodes: state.nodes
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            onClickExpand: (id: number) => {
                dispatch(expandButtonWasClicked(id));
            },
            fetchChildren: (parent: INode) => {
                dispatch(childrenRequestedThunk(parent));
            },
            massSelection: (node: INode) => {
                dispatch(checkboxWasClicked(node));
            },
            toggleSelection: (node: INode) => {
                dispatch(selectionWasClicked(node));
            }
        };
    }

    render() {
        const nodes: JSX.Element[] = this.props.nodes.map((node: INode) => {
            if (this.props.parentID === node.childof) {
                return (
                    <Node
                        {...node}
                        onClickExpand={this.props.onClickExpand}
                        fetchChildren={this.props.fetchChildren}
                        massSelection={this.props.massSelection}
                        toggleSelection={this.props.toggleSelection}
                        key={node.id}
                    />
                );
            } else {
                return (
                    <div />
                );
            }
        });

        return (
            // <Cell col={12}>
            <Grid className={'mdl-cell--12-col'}>
                {nodes}
            </Grid>
            // </Cell>
        );
    }
}

// Export just the connected component
export const Nodes = connect(UnconnectedNodes.mapStateToProps,
                             UnconnectedNodes.mapDispatchToProps)(UnconnectedNodes);
