import { Entities } from '../types';
import { Selected } from '../types';

// the code snippet below is a function which will be used to traverse the tree
// and determine the state of the parent based on the selection state of me and 
// my siblings
export const determineParentSelectedState = (entities: Entities, dbid: number) => {

    const dbidParent = entities[dbid].parent;
    if (dbidParent !== undefined) {
        if (entities[dbidParent].hasOwnProperty('children')) {
            const childIds = entities[dbidParent].children;
            if (childIds !== undefined) {
                const selectedArray = childIds.map((childId: number) => {
                    return entities[childId].selected;
                });
                const allSelected = selectedArray.every((selected: Selected) => {
                    return selected === Selected.All;
                });
                const allUnselected = selectedArray.every((selected: Selected) => {
                    return selected === Selected.None;
                });

                if (allSelected) {
                    return Selected.All;
                } else if (allUnselected) {
                    return Selected.None;
                } else {
                    return Selected.Partial;
                }
            } else {
                console.log('asd1');
                return Selected.None;
            }
        } else {
            console.log('asd2');
            return Selected.None;
        }
    } else {
        console.log('asd3');
        return Selected.None;
    }
};