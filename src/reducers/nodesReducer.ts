import { TNode } from '../types';

export const nodesReducer = (nodes: TNode[], action: any) => {
    if (nodes === undefined) {
        throw new Error('Initial state is undefined');
    } else {
        switch (action.type) {
            case 'ADD_NODES':
                console.log('in ADD_NODES');
                // who is the parent common to all nodes from payload
                const payloadNodes: TNode[] = action.payload;
                const firstParentId: number = payloadNodes[0].dbrecord.child_of;
                const sameParent = (node: TNode) => {
                    return firstParentId === node.dbrecord.child_of;
                };
                const payloadNodesHaveCommonParent = payloadNodes.every(sameParent);
                if (!payloadNodesHaveCommonParent) {
                    throw new Error('Payload nodes don\'t have one common parent');
                }
                // get position of parent in old state
                const parentIndex = nodes.findIndex((node: TNode) => {
                    return node.dbrecord.id === firstParentId;
                });
                if (parentIndex === -1) {
                    return payloadNodes;
                } else {
                    // the new state is old state from 0 up to and including the
                    // parent, followed by the nodes from payload, followed by
                    // the remaining nodes from old state
                    const begin = nodes.slice(0, parentIndex + 1);
                    const middle = payloadNodes;
                    const end = nodes.slice(parentIndex + 1);
                    return begin.concat(middle).concat(end);
                }
            // case 'FETCH_CHILD_NODES':
            //     // should fire a query to get child nodes of node action.payload
            //     console.log('in FETCH_CHILD_NODES');
            //     const node: Node = action.payload.node;
            //     // beware: side effects happen here:
            //     node.fetchChildNodes(action.payload.dispatch);
            //     return state;
            case 'EXPAND_BUTTON_WAS_CLICKED':
                console.log('in EXPAND_BUTTON_WAS_CLICKED');
                return nodes.map((node: TNode) => {
                    if (action.payload === node.dbrecord.id) {
                        console.log('node = ', node.dbrecord.id);
                        return Object.assign({}, node, {isexpanded: true});
                    } else {
                        return node;
                    }
                });
            default: {
                return nodes;
            }
        }
    }
};
