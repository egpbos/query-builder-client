import 'whatwg-fetch';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { CHILDREN_RECEIVED }            from '../actions';
import { CHILDREN_REQUESTED }           from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }    from '../actions';
import { SELECTION_WAS_CLICKED }        from '../actions';
import { CLEAR_QUERY }                  from '../actions';
import { IGenericAction }               from '../actions';
import { TEXT_SEARCH_RESULT_RECEIVED }  from '../actions';

import { SelectionState }               from '../interfaces';

import { INode }                        from '../components/Node';

const initstate: any = { textSearchResults: []};

export const nodesReducerFactory = (table : string = '') => {
    return (nodes: any = initstate, action: IGenericAction) => {
        //Check if the action is meant for this reducer
        if (action.type !== CLEAR_QUERY && action.payload && action.payload.table !== table) {
            return nodes;
        }

        /*
            Updates the selection state of nodes based on the new selection state, 
            and does so for all children, grandchildren etc. recursively down the tree.
        */
        function recursiveUpdateSelectionStateDown(newNodes: any, selectionID: number, newState: SelectionState ) {
            const selectedNode = nodes[selectionID];
            const childrenIDs: number[] = selectedNode.children;
            if (selectedNode.children && childrenIDs.length > 0) {
                childrenIDs.forEach((childID: number) => {
                    newNodes[childID] = Object.assign({}, newNodes[childID], {selectionState: newState});
                    newNodes = recursiveUpdateSelectionStateDown(newNodes, childID, newState);
                });
            }

            return newNodes;
        }

        /*
            Updates the selection state of nodes based on the new selection state, 
            and does so for all parents, grandparents etc. recursively up the tree.
        */
        function recursiveUpdateSelectionStateUp(newNodes: any, selectionID : number) {
            const selectedNode = newNodes[selectionID];
            const parentID = selectedNode.parent;
            if (parentID !== -1) {
                const parentNode = newNodes[parentID];

                //The children of our parent are our siblings
                const siblingIDs = parentNode.children;

                /* Determine the new state of our parent. Either
                    - Selected, if all siblings are selected
                    - Partial, if some siblings are selected
                    - Unselected, if no siblings are selected
                */
                let allSelected = true;
                let someSelected = false;

                siblingIDs.forEach((siblingID: number) => {
                    const sibling = newNodes[siblingID];
                    if (sibling.selectionState === SelectionState.Unselected) {
                        allSelected = false;
                    } else if (sibling.selectionState === SelectionState.Partial) {
                        allSelected = false;
                        someSelected = true;
                    } else if (sibling.selectionState === SelectionState.Selected) {
                        someSelected = true;
                    }
                });

                let newParentState = SelectionState.Unselected;
                if (allSelected) {
                    newParentState = SelectionState.Selected;
                } else if (someSelected) {
                    newParentState = SelectionState.Partial;
                }

                newNodes[parentID] = Object.assign({}, nodes[parentID], {selectionState: newParentState});

                newNodes = recursiveUpdateSelectionStateUp(newNodes, parentID);
            }

            return newNodes;
        }

        /*
            Updates the highlight state of nodes based on the new highlight state, 
            and does so for all parents, grandparents etc. recursively up the tree.
        */
        // function recursiveUpdateHightlightStateUp(newNodes: any, highlightID : number, shouldHighlight : boolean) {
        //     const selectedNode = newNodes[highlightID];
        //     const parentID = selectedNode.parent;
        //     if (parentID !== -1) {
        //         newNodes[parentID] = Object.assign({}, nodes[parentID], {highlighted: shouldHighlight});

        //         newNodes = recursiveUpdateHightlightStateUp(newNodes, parentID, shouldHighlight);
        //     }

        //     return newNodes;
        // }

        if (action.type === ROOT_RECEIVED) {
            //RootRequestedThunk return point
            const root = action.payload.root;
            return Object.assign({}, initstate, { [root.id]: root });
        } else if (action.type === ROOT_REQUESTED) {
            return nodes;
        } else if (action.type === CHILDREN_RECEIVED) {
            //ChildrenRequestedThunk return point
            const payloadNodes = action.payload.nodes;
            const parentId = payloadNodes[0].parent;

            //Copy the parent node
            const oldParent = nodes[parentId];
            const newParent = Object.assign({}, oldParent);

            //With a deep copy of its children array.
            newParent.children = [];
            if (oldParent.children !== undefined) {
                oldParent.children.forEach((child: number) => {
                    newParent.children.push(child);
                });
            }

            // Set the selection state for the new nodes based on the
            // selection state of the parent (default is Unselected)
            payloadNodes.forEach((payloadNode: INode) => {
                if (newParent.selectionState === SelectionState.Selected) {
                    payloadNode.selectionState = SelectionState.Selected;
                }
            });

            // Add the IDs of the payloadNodes to the parent node's list of children
            payloadNodes.forEach((payloadNode: INode) => {
                if (newParent.children === undefined) {
                    newParent.children = [];
                }
                if (newParent.children.indexOf(payloadNode.id) < 0) {
                    newParent.children.push(payloadNode.id);
                }
            });

            // The new list of nodes the old list of nodes, except it's a new
            // object and it has newParent as the value of key parentId. It does
            // not include any payloadNodes yet at this stage.
            const newNodes = Object.assign({}, nodes, { [parentId]: newParent});

            // Finally, the payloadNodes need to be added to the new list of
            // nodes, using the id of the payloadNode as the key.
            payloadNodes.forEach((payloadNode: INode) => {
                if (!newNodes[payloadNode.id]) {
                    newNodes[payloadNode.id] = payloadNode;
                    const searchResultsArray = Object.keys(nodes.textSearchResults).map((key) => {
                        return nodes.textSearchResults[key];
                    });
                    if (searchResultsArray.indexOf(payloadNode.id) >= 0) {
                        newNodes[payloadNode.id] = Object.assign({}, newNodes[payloadNode.id], {highlighted: true});
                    } else {
                        newNodes[payloadNode.id] = Object.assign({}, newNodes[payloadNode.id], {highlighted: false});
                    }
                }
            });

            return newNodes;
        } else if (action.type === CHILDREN_REQUESTED) {
            return nodes;
        } else if (action.type === EXPAND_BUTTON_WAS_CLICKED) {
            const newNodes = Object.assign({}, nodes);

            const { id } = action.payload;
            const selectedNode = nodes[id];

            newNodes[id] = Object.assign({}, selectedNode, {isexpanded: !selectedNode.isexpanded});

            return newNodes;
        } else if (action.type === SELECTION_WAS_CLICKED) {
            let newNodes = Object.assign({}, nodes);

            const { id } = action.payload;
            const selectedNode = nodes[id];

            //First, determine our own new state and set it
            let newTargetState = SelectionState.Unselected;
            if (selectedNode.selectionState === SelectionState.Unselected) {
                newTargetState = SelectionState.Selected;
            }
            newNodes[id] = Object.assign({}, selectedNode, {selectionState: newTargetState});

            //Update parent recursively
            newNodes = recursiveUpdateSelectionStateUp(newNodes, id);

            //Update children recursively
            newNodes = recursiveUpdateSelectionStateDown(newNodes, id, newTargetState);

            return newNodes;
        } else if (action.type === CLEAR_QUERY) {
            let newNodes = Object.assign({}, nodes);

            const selectedNode = nodes[1];

            newNodes[1] = Object.assign({}, selectedNode, {selectionState: SelectionState.Unselected});

            //Update children recursively
            newNodes = recursiveUpdateSelectionStateDown(newNodes, 1, SelectionState.Unselected);

            return newNodes;
        } else if (action.type === TEXT_SEARCH_RESULT_RECEIVED) {
            //TextSearchThunk return point
            const newNodes = Object.assign({}, nodes, {textSearchResults: action.payload.nodes});

            const payloadNodeIDs = action.payload.nodes;

            Object.keys(nodes).forEach((key) => {
                if (key !== 'textSearchResults') {
                    const node = nodes[key];
                    newNodes[key] = Object.assign({}, node, {highlighted: false});
                }
            });

            payloadNodeIDs.forEach((payloadNodeID: number) => {
                const id = payloadNodeID;
                const node = nodes[id];
                if (node !== undefined) {
                    newNodes[id] = Object.assign({}, node, {highlighted: true});
                }
            });

            return newNodes;
         } else {
            return nodes;
        }
    };
};
