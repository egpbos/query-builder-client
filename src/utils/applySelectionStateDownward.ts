import { Entities }          from '../types';
import { deepCopyWithChange} from '../utils';
import { Selected }          from '../utils';

export const applySelectionStateDownward = (entities: Entities, dbid: number, selected: Selected): Entities => {

    const childIds = entities[dbid].children;
    if (childIds !== undefined) {
        childIds.forEach((childId: number) => {
            entities = deepCopyWithChange(entities, childId, {selected});
            entities = applySelectionStateDownward(entities, childId, selected);
        });
    }
    return entities;
};
