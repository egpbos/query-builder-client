import 'whatwg-fetch';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { CHILDREN_RECEIVED }            from '../actions';
import { CHILDREN_REQUESTED }           from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }    from '../actions';
import { SELECTION_WAS_CLICKED }        from '../actions';
import { IGenericAction }               from '../actions';
import { INode }                        from '../components/Node';
import { SelectionState }               from '../interfaces';
import { up as updateUp }               from './selection-updaters';
import { down as updateDown }           from './selection-updaters';

const initstate: any = {};

export const nodesReducer = (nodes: any = initstate, action: IGenericAction) => {

    console.log(new Date().toISOString().slice(11, 19), action.type);

    switch (action.type) {
        case ROOT_RECEIVED: {
            //RootRequestedThunk return point
            const {root} = action.payload;
            return Object.assign({}, { [root.id]: root });
        }
        case ROOT_REQUESTED: {
            return nodes;
        }
        case CHILDREN_RECEIVED: {
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
                newParent.children.push(payloadNode.id);
            });

            // The new list of nodes the old list of nodes, except it's a new
            // object and it has newParent as the value of key parentId. It does
            // not include any payloadNodes yet at this stage.
            const newNodes = Object.assign({}, nodes, { [parentId]: newParent});

            // Finally, the payloadNodes need to be added to the new list of
            // nodes, using the id of the payloadNode as the key.
            payloadNodes.forEach((payloadNode: INode) => {
                newNodes[payloadNode.id] = payloadNode;
            });

            return newNodes;
        }
        case CHILDREN_REQUESTED: {
            return nodes;
        }
        case EXPAND_BUTTON_WAS_CLICKED: {
            const {id} = action.payload;
            const oldNode = nodes[id];
            const newNode = Object.assign({}, oldNode, {isexpanded: !oldNode.isexpanded});
            return Object.assign({}, nodes, {[id]: newNode});
        }
        case SELECTION_WAS_CLICKED: {
            const {id} = action.payload;
            const selectedNode = nodes[id];

            //First, determine our own new state and set it
            let targetState = SelectionState.Unselected;
            if (selectedNode.selectionState === SelectionState.Unselected) {
                targetState = SelectionState.Selected;
            }

            const newNode = Object.assign({}, selectedNode, {selectionState: targetState});
            const newNodes = Object.assign({}, nodes, { [id]: newNode});

            //Update parent recursively
            updateUp(nodes, id);

            //Update children recursively
            updateDown(nodes, id, targetState);

            return newNodes;
        }
        default: {
            return nodes;
        }
    }
};
