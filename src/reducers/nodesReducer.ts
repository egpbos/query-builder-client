import 'whatwg-fetch';

// import { Model } from 'redux-orm';

import { ROOT_RECEIVED }                from '../actions';
import { ROOT_REQUESTED }               from '../actions';
import { CHILDREN_RECEIVED }            from '../actions';
import { CHILDREN_REQUESTED }           from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }    from '../actions';
import { SELECTION_WAS_CLICKED }        from '../actions';
import { CHECKBOX_WAS_CLICKED }         from '../actions';
import { IGenericAction }               from '../actions';

import { SelectionState }   from '../interfaces';
import { INewNode } from '../components/NewNode';

const initstate: any = {};

// function recursiveSearchSetSelectionState(state: any, nodeID: number, newSelectionState: SelectionState): INode[] {
//     return state.map((node: INode) => {
//         if (nodeID === node.id) {
//             const children = state.filter((child) => {
//                 return child.childof === node.id;
//             });
//             children.map((filteredChild: INode) => {
//                 recursiveSearchSetSelectionState(children, filteredChild.id, newSelectionState);
//             });

//             console.log("assigning " + newSelectionState + " to " + node.name);

//             return Object.assign({}, node, {
//                 //Set the node itself to the new state
//                 selectionState: newSelectionState
//             });
//         } else {
//             return node;
//         }
//     });
// }

// function recursiveSearchSetSelectionStateAndParentState(state: INode[], targetNode: INode, newSelectionState: SelectionState, parentNode: INode, newParentState: SelectionState): INode[] {
//     return state.map((node: INode) => {
//         if (targetNode.id === node.id) {
//             return Object.assign({}, node, {
//                 //Set the node itself to the new state
//                 selectionState: newSelectionState
//             });
//         } else if (parentNode.id === node.id) {
//             return Object.assign({}, node, {
//                 //Set the parent to the new state
//                 selectionState: newParentState
//             });
//         }else {
//             return Object.assign({}, node, {
//                 //Search for the correct node recursively
//                 myChildren: recursiveSearchSetSelectionStateAndParentState(node.myChildren, targetNode, newSelectionState, parentNode, newParentState)
//             });
//         }
//     });
// }

// function recursiveSearchSetParentState(state: INode[], targetNode: INode): INode[] {
//     return state.map((node: INode) => {
//         if (targetNode.id === node.id) {
//             const siblings = targetNode.myChildren;
//             let allSelected = true;
//             let someSelected = false;

//             siblings.forEach((sibling: INode) => {
//                 //If we do not have ourselves here, but an actual sibling
//                 if (sibling.id !== targetNode.id) {
//                     if (sibling.selectionState === SelectionState.Unselected) {
//                         allSelected = false;
//                     } else if (sibling.selectionState === SelectionState.Partial) {
//                         allSelected = false;
//                         someSelected = true;
//                     } else if (sibling.selectionState === SelectionState.Selected) {
//                         someSelected = true;
//                     }
//                 }
//             });

//             console.log(siblings);

//             console.log("Siblings all selected: " + allSelected);
//             console.log("Siblings some selected: " + someSelected);

//             let newTargetState = SelectionState.Unselected;
//             if (targetNode.selectionState === SelectionState.Unselected) {
//                 newTargetState = SelectionState.Selected;
//             }

//             let newParentState = SelectionState.Unselected;
//             if (allSelected && newTargetState === SelectionState.Selected) {
//                 newParentState = SelectionState.Selected;
//             } else if (someSelected || newTargetState === SelectionState.Selected) {
//                 newParentState = SelectionState.Partial;
//             }

//             return Object.assign({}, node, {
//                 //Set the parent to the new state
//                 selectionState: newParentState
//             });
//         } else {
//             return Object.assign({}, node, {
//                 //Search for the correct node recursively
//                 myChildren: recursiveSearchSetParentState(node.myChildren, targetNode)
//             });
//         }
//     });
// }

export const nodesReducer = (nodes: any = initstate, action: IGenericAction) => {
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

        // case CHECKBOX_WAS_CLICKED:
        //     const selectedID = action.payload.id;

        //     return Object.assign({}, nodes[selectedID], {isexpanded: true});
            // const targetNode = action.payload.node;

            // if (targetNode.selectionState === SelectionState.Unselected) {
            //     return recursiveSearchSetSelectionState(nodes, targetNode.id, SelectionState.Selected);
            // } else {
            //     return recursiveSearchSetSelectionState(nodes, targetNode.id, SelectionState.Unselected);
            // }
        case SELECTION_WAS_CLICKED:
            const selectedID = action.payload.id;

            return Object.assign({}, nodes[selectedID], {isexpanded: true});
            // const targetNodeForSelection = action.payload.node;
            // const parent = action.payload.node.parent;
            // const siblings = action.payload.node.parent.myChildren;

            // let allSelected = true;
            // let someSelected = false;

            // siblings.forEach((sibling: INode) => {
            //     //If we do not have ourselves here, but an actual sibling
            //     if (sibling !== targetNodeForSelection) {
            //         if (sibling.selectionState === SelectionState.Unselected) {
            //             allSelected = false;
            //         } else if (sibling.selectionState === SelectionState.Partial) {
            //             allSelected = false;
            //             someSelected = true;
            //         } else if (sibling.selectionState === SelectionState.Selected) {
            //             someSelected = true;
            //         }
            //     }
            // });

            // console.log(siblings);

            // console.log("Siblings all selected: " + allSelected);
            // console.log("Siblings some selected: " + someSelected);

            // let newTargetState = SelectionState.Unselected;
            // if (targetNodeForSelection.selectionState === SelectionState.Unselected) {
            //     newTargetState = SelectionState.Selected;
            // }

            // let newParentState = SelectionState.Unselected;
            // if (allSelected && newTargetState === SelectionState.Selected) {
            //     newParentState = SelectionState.Selected;
            // } else if (someSelected || newTargetState === SelectionState.Selected) {
            //     newParentState = SelectionState.Partial;
            // }

            // return recursiveSearchSetParentState(nodes, parent);

        default: {
            return nodes;
        }
    }
};
