import { Entities }           from '../types';
import { Selected }           from '../utils';
import { deepCopyWithChange } from '../utils';

export const propagateSelectionStateUpward = (entities: Entities, dbid: number): Entities => {

    console.log(dbid);
    const selected = Selected.All;

    const dbidRoot = -1;
    if (dbid !== dbidRoot) {
        const dbidParent = entities[dbid].parent;
        if (dbidParent !== undefined) {
            entities = deepCopyWithChange(entities, dbidParent, { selected });
            entities = propagateSelectionStateUpward(entities, dbidParent);
        } else {
            //
        }
    }
    return entities;
};
