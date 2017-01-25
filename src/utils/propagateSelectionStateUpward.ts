import { Entities }                     from '../types';
import { deepCopyWithChange }           from '../utils';
import { determineParentSelectedState } from '../utils';

export const propagateSelectionStateUpward = (entities: Entities, dbid: number): Entities => {

    console.log(dbid);

    const dbidRoot = -1;
    if (dbid !== dbidRoot) {
        const dbidParent = entities[dbid].parent;
        if (dbidParent !== undefined) {
            const selected = determineParentSelectedState(entities, dbid);
            entities = deepCopyWithChange(entities, dbidParent, { selected });
            entities = propagateSelectionStateUpward(entities, dbidParent);
        } else {
            //
        }
    }
    return entities;
};
