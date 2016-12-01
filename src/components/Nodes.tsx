import * as React                 from 'react';
import { connect }                from 'react-redux';

import { expandButtonWasClicked } from '../actions';
import { childrenRequestedThunk } from '../actions';
import { Node }                   from '../components';
import { TNode }                  from '../types';
import { TStore }                 from '../types';

interface IOwnProps {
    nodes: TNode[];
}
interface IDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

class UnconnectedNodes extends React.Component<IOwnProps & IDispatchProps, {}> {

    constructor() {
        super();
    }

    static mapStateToProps(state: TStore) {
        return {
            nodes: state.nodes
        };
    }

    static mapDispatchToProps(dispatch: any) {
        return {
            onClickExpand: (id: number) => {
                dispatch(expandButtonWasClicked(id));
            },
            fetchChildren: (id: number) => {
                dispatch(childrenRequestedThunk(id));
            }
        };
    }

    render() {
        const nodes = this.props.nodes.map((node: TNode) => {
            return (
                <Node
                    {...node}
                    onClickExpand={this.props.onClickExpand}
                    fetchChildren={this.props.fetchChildren}
                    key={node.id}
                />
            );
            });

        return (
            <div>
                {nodes}
            </div>
        );
    }
}

// Export just the connected component
export const Nodes = connect(UnconnectedNodes.mapStateToProps,
                             UnconnectedNodes.mapDispatchToProps)(UnconnectedNodes);
