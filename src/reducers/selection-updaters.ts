import { INode }           from '../interfaces';
import { SelectionState }  from '../interfaces';

/*
    Updates the selection state of nodes based on the new selection state, 
    and does so for all children, grandchildren etc. recursively down the tree.
*/
export function down(nodes: INode[], id: number, newState: SelectionState ) {
    const selectedNode = nodes[id];

    const childrenIDs: number[] = selectedNode.children;
    if (selectedNode.children && childrenIDs.length > 0) {
        childrenIDs.forEach((childID: number) => {
            nodes[childID] = Object.assign({}, nodes[childID], {selectionState: newState});
            down(nodes, childID, newState);
        });
    }
}

/*
    Updates the selection state of nodes based on the new selection state, 
    and does so for all parents, grandparents etc. recursively up the tree.
*/
export function up(nodes: INode[], id : number) {
    const selectedNode = nodes[id];

    const parentId = selectedNode.parent;
    if (parentId !== -1) {
        const parentNode = nodes[parentId];

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
            const sibling = nodes[siblingID];
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

        nodes[parentId] = Object.assign({}, nodes[parentId], {selectionState: newParentState});

        up(nodes, parentId);
    }
}
