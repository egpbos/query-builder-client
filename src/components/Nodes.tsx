import * as React                 from 'react';
import { connect }                from 'react-redux';

import { expandButtonWasClicked } from '../actions';
import { fetchChildrenThunk }     from '../actions';
import { Node }                   from '../components';
import { TNode }                  from '../types';
import { TStore }                 from '../types';

class UnconnectedNodes extends React.Component<any, any> {

    constructor() {
        super();
    }

    static propTypes = {
        nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        onClickExpand: React.PropTypes.func,
        fetchChildren: React.PropTypes.func
    };

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
                dispatch(fetchChildrenThunk(id));
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
                    key={node.dbrecord.id}
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
