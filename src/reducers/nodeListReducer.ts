import { NodeLogic }      from '../components/NodeLogic';

type StateType = NodeLogic[] ;
const initialState: StateType = [];

export const nodeListReducer = (state: StateType, action: any) => {
    if (state === undefined) {
        return initialState;
    } else {
        switch (action.type) {
            case 'ADD_NODES':
                console.log('in ADD_NODES');
                // who is the parent common to all nodes from payload
                const payloadNodes: NodeLogic[] = action.payload;
                const firstParentId: number = payloadNodes[0].dbrecord.child_of;
                const sameParent = (node: NodeLogic) => {
                    return firstParentId === node.dbrecord.child_of;
                };
                const payloadNodesHaveCommonParent = payloadNodes.every(sameParent);
                if (!payloadNodesHaveCommonParent) {
                    throw new Error('Payload nodes don\'t have one common parent');
                }
                // get position of parent in old state
                const parentIndex = state.findIndex((node: NodeLogic) => {
                    return node.dbrecord.id === firstParentId;
                });
                if (parentIndex === -1) {
                    return payloadNodes;
                } else {

                    // the new state is old state from 0 up to and including the
                    // parent, followed by the nodes from payload, followed by
                    // the remaining nodes from old state
                    const begin = state.slice(0, parentIndex + 1);
                    const middle = payloadNodes;
                    const end = state.slice(parentIndex + 1);
                    return begin.concat(middle).concat(end);

                }
            case 'FETCH_CHILD_NODES': {
                // should fire a query to get child nodes of node action.payload
                console.log('in FETCH_CHILD_NODES');
                const node: NodeLogic = action.payload.node;
                // beware: side effects happen here:
                node.fetchChildNodes(action.payload.dispatch);
                return state;
            }
            case 'TOGGLE_ISEXPANDED':
                console.log('in TOGGLE_ISEXPANDED');
                return state.map((node) => {
                    if (action.payload === node.dbrecord.id) {
                        //return Object.assign({}, node, {isexpanded: !node.isexpanded});
                        return Object.assign(new NodeLogic(node.dbrecord), node, {isexpanded: !node.isexpanded});
                    } else {
                        return node;
                    }
                });
            default: {
                return state;
            }
        }
    }
};
