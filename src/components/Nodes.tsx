import * as React                       from 'react';
import { connect }                      from 'react-redux';
import { Dispatch }                     from 'redux';

import { expandButtonWasClicked }       from '../actions';
import { childrenRequestedThunk }       from '../actions';
import { IGenericAction}                from '../actions';
import { Node }                         from '../components';
import { INode }                        from '../interfaces';
import { IStore }                       from '../interfaces';

interface IOwnProps {
    nodes: INode[];
}
interface IDispatchProps {
    onClickExpand: (id: number) => void;
    fetchChildren: (id: number) => void;
}

class UnconnectedNodes extends React.Component<IOwnProps & IDispatchProps, {}> {

    constructor() {
        super();
    }

    static mapStateToProps(state: IStore) {
        return {
            nodes: state.nodes
        };
    }

    static mapDispatchToProps(dispatch: Dispatch<IGenericAction>) {
        return {
            onClickExpand: (id: number) => {
                console.log(dispatch);
                dispatch(expandButtonWasClicked(id));
            },
            fetchChildren: (id: number) => {
                dispatch(childrenRequestedThunk(id));
            }
        };
    }

    render() {
        const nodes = this.props.nodes.map((node: INode) => {
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
