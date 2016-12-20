import 'whatwg-fetch';

// import { Model } from 'redux-orm';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { CHILDREN_RECEIVED }            from '../actions';
import { CHILDREN_REQUESTED }           from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }    from '../actions';
import { SELECTION_WAS_CLICKED }        from '../actions';
import { IGenericAction }               from '../actions';

import { SelectionState }   from '../interfaces';
import { INewNode } from '../components/NewNode';

const initstate: any = {};

export const nodesReducer = (nodes: any = initstate, action: IGenericAction) => {
    function recursiveUpdateSelectionStateDown(selectionID: number, newState: SelectionState ) {
        const selectedNode = nodes[selectionID];

        const childrenIDs: number[] = selectedNode.children;
        if (childrenIDs.length > 0) {
            childrenIDs.forEach((childID: number) => {
                nodes[childID] = Object.assign({}, nodes[childID], {selectionState: newState});
                recursiveUpdateSelectionStateDown(childID, newState);
            });
        }
    }

    function recursiveUpdateSelectionStateUp(selectionID : number, newState: SelectionState) {
        const selectedNode = nodes[selectionID];

        const parentID = selectedNode.parent;
        if (parentID !== -1) {
            const parentNode = nodes[parentID];

            const siblingIDs = parentNode.children;

            let allSelected = true;
            let someSelected = false;

            siblingIDs.forEach((siblingID: number) => {
                const sibling = nodes[siblingID];
                //If we do not have ourselves here, but an actual sibling
                if (siblingID !== selectionID) {
                    if (sibling.selectionState === SelectionState.Unselected) {
                        allSelected = false;
                    } else if (sibling.selectionState === SelectionState.Partial) {
                        allSelected = false;
                        someSelected = true;
                    } else if (sibling.selectionState === SelectionState.Selected) {
                        someSelected = true;
                    }
                }
            });

            let newParentState = SelectionState.Unselected;
            if (allSelected && newState === SelectionState.Selected) {
                newParentState = SelectionState.Selected;
            } else if (someSelected || newState === SelectionState.Selected) {
                newParentState = SelectionState.Partial;
            }

            nodes[parentID] = Object.assign({}, nodes[parentID], {selectionState: newParentState});

            recursiveUpdateSelectionStateUp(parentID, newParentState);
        }
    }

    switch (action.type) {
        case ROOT_RECEIVED:
            //RootRequestedThunk return point
            const root = action.payload.root;
            return { [root.id]: root };
        case ROOT_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case CHILDREN_RECEIVED:
            //ChildrenRequestedThunk return point
            const payloadNodes = action.payload.nodes;

            payloadNodes.forEach((node : INewNode) => {
                nodes[node.id] = node;
            });

            //Deep copy of children array.
            let oldParent = nodes[payloadNodes[0].parent];
            let newParent = Object.assign({}, oldParent);
            newParent.children = [];
            if (oldParent.children !== undefined) {
                oldParent.children.forEach((child: number) => {
                    newParent.children.push(child);
                });
            }

            //Add new children coming in.
            payloadNodes.forEach((node : INewNode) => {
                if (newParent.children === undefined) {
                    newParent.children = [];
                }
                newParent.children.push(node.id);
            });
            nodes[payloadNodes[0].parent] = newParent;

            return nodes;
        case CHILDREN_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case EXPAND_BUTTON_WAS_CLICKED:
            const expandID = action.payload.id;

            nodes[expandID] = Object.assign({}, nodes[expandID], {isexpanded: true});

            return nodes;
        case SELECTION_WAS_CLICKED:
            const selectionID = action.payload.id;
            const selectedNode = nodes[selectionID];

            //First, determine our own new state and set it
            let newTargetState = SelectionState.Unselected;
            if (selectedNode.selectionState === SelectionState.Unselected) {
                newTargetState = SelectionState.Selected;
            }
            nodes[selectionID] = Object.assign({}, nodes[selectionID], {selectionState: newTargetState});

            //Update parent recursively
            recursiveUpdateSelectionStateUp(selectionID, newTargetState);

            //Update children recursively
            recursiveUpdateSelectionStateDown(selectionID, newTargetState);

            return nodes;
        default: {
            return nodes;
        }
    }
};
