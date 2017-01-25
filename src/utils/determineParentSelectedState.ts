import { Selected } from '../utils';

// the code snippet below is a function which will be used to traverse the tree
// and determine the state of the parent based on the selection state of me and 
// my siblings
export const determineParentSelectedState = (entities: any, dbid: number) => {

    const children = entities[dbid].parent.children;
    const selected = children.map((childId: number) => {
        return entities[childId].selected;
    });

    const allSelected = selected.indexOf(Selected.None) === -1;
    const allUnselected = selected.indexOf(Selected.All) === -1;

    if (allSelected) {
        return Selected.All;
    } else if (allUnselected) {
        return Selected.None;
    } else {
        return Selected.Partial;
    }
};
