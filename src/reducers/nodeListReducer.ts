import { NodeLogic }      from '../components/NodeLogic';
import { SelectionState } from '../components/NodeLogic';

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
                const parent: NodeLogic = action.payload.parent;
                const payloadNodes: NodeLogic[] = action.payload.children;
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
            case 'FETCH_CHILD_NODES':
                // should fire a query to get child nodes of node action.payload
                console.log('in FETCH_CHILD_NODES');
                const node: NodeLogic = action.payload.node;
                // beware: side effects happen here:
                node.fetchChildNodes(action.payload.dispatch);
                return state;
            case 'TOGGLE_ISEXPANDED':
                console.log('in TOGGLE_ISEXPANDED');
                return state.map((node) => {
                    if (action.payload === node.dbrecord.id) {
                        const newNode = new NodeLogic(node.dbrecord, node.parent);
                        return Object.assign(newNode, node, {isexpanded: !node.isexpanded});
                    } else {
                        return node;
                    }
                });
            case 'TOGGLE_ISSELECTED':
                console.log('in TOGGLE_ISSELECTED');
                return state.map((node) => {
                    if (action.payload === node.dbrecord.id) {
                        let allSelected = true;
                        let someSelected = false;
                        //For all siblings
                        if (node.parent !== null) {
                            node.parent.children.forEach((sibling) => {
                                if (sibling !== node) {
                                    if (sibling.selectedState === SelectionState.Selected) {
                                        someSelected = true;
                                    } else if (sibling.selectedState === SelectionState.Partial) {
                                        someSelected = true;
                                    } else {
                                        allSelected = false;
                                    }
                                }
                            });
                            console.log('someSelected: '+ someSelected + ' allSelected: ' +allSelected);
                        }

                        const newNode = new NodeLogic(node.dbrecord, node.parent);
                        if (node.selectedState === SelectionState.Selected || node.selectedState === SelectionState.Partial) {
                            return Object.assign(newNode, node, { selectedState : SelectionState.Unselected });
                        } else {
                            return Object.assign(newNode, node, { selectedState : SelectionState.Selected });
                        }                        
                    } else {
                        return node;
                    }
                });
            case 'TOGGLE_MASSSELECTED':
                console.log('in TOGGLE_MASSSELECTED');
                return state.map((node) => {
                    if (action.payload === node.dbrecord.id) {
                        const newNode = new NodeLogic(node.dbrecord, node.parent);
                        if (node.selectedState === SelectionState.Selected || node.selectedState === SelectionState.Partial) {
                            node.children.forEach((child) => {
                                child.selectedState = SelectionState.Unselected;
                            });
                            return Object.assign(newNode, node, { selectedState : SelectionState.Unselected });
                        } else {
                            node.children.forEach((child) => {
                                child.selectedState = SelectionState.Selected;
                            });
                            return Object.assign(newNode, node, { selectedState : SelectionState.Selected });
                        }
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
