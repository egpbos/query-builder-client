import * as React     from 'react';
import { connect }    from 'react-redux';

import { TNode }      from '../types';
import { TStore }     from '../types';
import { addNodes }   from './../actions/addNodes';
import { expandNode } from './../actions/expandNode';
import { Node }       from './Node';

class UnconnectedNodes extends React.Component<any, any> {

    constructor() {
        super();
    }

    static propTypes = {
        nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    };

    static mapStateToProps(state: TStore) {
        return {
            nodes: state.nodes
        };
    }

    static mapDispatchToProps(dispatch: any) {
        return {
            addNodes: () => {
                dispatch(addNodes);
            },
            expandNode: () => {
                dispatch(expandNode);
            }
        };
    }

    render() {
        const nodes = this.props.nodes.map((node: TNode) => {
            return <Node {...node} key={node.dbrecord.id} />;
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
