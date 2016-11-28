import * as React    from 'react';
import { connect }   from 'react-redux';

import { TNode }     from '../types';
import { TStore }    from '../types';
import { Node }      from './Node';

class UnconnectedNodes extends React.Component<any, any> {

    constructor() {
        super();
        // make sure that instances of this class refer to the correct
        // 'this' when calling the .handleChange() method by binding it to the
        // this from the current context.
        // this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        nodes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        onChange: React.PropTypes.func.isRequired
    };

    static mapStateToProps(state: TStore) {
        return {
            nodes: state.nodes
        };
    }

    static mapDispatchToProps(dispatch: any) {
        const action = {
            type: 'CHANGE_HEADERTEXT',
            payload: 'changed from Nodes.mapDispatchToProps()'
        };
        return {
            onChange: () => {
                    dispatch(action);
                }
        };
    }

    render() {
        const nodes = this.props.nodes.map((node: TNode) => {
            const onclick = () => {
                console.log('should dispatch an action to expand the Node ' +
                    'with dbrecord.id === ' + node.dbrecord.id.toString());
            };
            return <Node {...node} onclick={onclick} />;
        });

        return (
            <div>
                {nodes}
            </div>
        );
    }
}

// export just the connected component
export const Nodes = connect(UnconnectedNodes.mapStateToProps,
                             UnconnectedNodes.mapDispatchToProps)(UnconnectedNodes);
