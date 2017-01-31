import { Entities }                     from '../types';
import { deepCopyWithChange }           from '../utils';
import { determineParentSelectedState } from '../utils';

export const propagateSelectionStateUpward = (nodes: Entities, dbid: number): Entities => {

    console.log(dbid);

    const dbidRoot = -1;
    if (dbid !== dbidRoot) {
        const dbidParent = nodes[dbid].parent;
        if (dbidParent !== undefined) {
            const selected = determineParentSelectedState(nodes, dbid);
            nodes = deepCopyWithChange(nodes, dbidParent, { selected });
            nodes = propagateSelectionStateUpward(nodes, dbidParent);
        } else {
            //
        }
    }
    return nodes;
};
