import { CHILDREN_RECEIVED }                  from '../actions';
import { CHILDREN_REQUESTED }                 from '../actions';
import { COLLAPSE_FOLDER_WAS_CLICKED }        from '../actions';
import { EXPAND_FOLDER_WAS_CLICKED }          from '../actions';
import { TOGGLE_FILE_SELECTED_WAS_CLICKED }   from '../actions';
import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from '../actions';

import { Entities }                           from '../types';
import { GenericAction }                      from '../types';
import { Selected }                           from '../types';
import { deepCopyWithChange }                 from '../utils';
import { threewayToggleSelection }            from '../utils';
import { applySelectionStateDownward }        from '../utils';
import { propagateSelectionStateUpward }      from '../utils';

const initstate: Entities = {
    [-1]: {
        children: undefined,
        dbid:     -1,
        expanded: false,
        isfile:   false,
        name:     'root',
        parent:   undefined,
        selected: Selected.None
    }
};

export const entitiesReducer = (entities: Entities = initstate, action: GenericAction) => {

    console.log(new Date().toISOString().slice(11, 19), action.type);

    if (action.type === CHILDREN_RECEIVED) {
        const payloadChildren = action.payload.entities;
        const parentId = payloadChildren[0].parent;

        //Copy the parent node
        const oldParent = entities[parentId];
        const newParent = Object.assign({}, oldParent);

        //With a deep copy of its children array.
        newParent.children = [];
        if (oldParent.hasOwnProperty('children') && oldParent.children !== undefined) {
            newParent.children = [...oldParent.children];
        }

        // Add the dbid of each payloadChild to the parent's list of children
        payloadChildren.forEach((payloadChild: any) => {
            if (newParent.children === undefined) {
                newParent.children = [];
            }
            newParent.children.push(payloadChild.dbid);
        });

        const newEntities = Object.assign({}, entities, { [parentId]: newParent});

        // Finally, the payloadChildren need to be added to the list of
        // entities, using the dbid of the payloadEntity as the key.
        payloadChildren.forEach((payloadChild: any) => {
            newEntities[payloadChild.dbid] = payloadChild;
        });
        return newEntities;

    } else if (action.type === CHILDREN_REQUESTED) {
        return entities;

    } else if (action.type === EXPAND_FOLDER_WAS_CLICKED) {

        return deepCopyWithChange(entities, action.payload.dbid, {expanded: true});

    } else if (action.type === COLLAPSE_FOLDER_WAS_CLICKED) {

        return deepCopyWithChange(entities, action.payload.dbid, {expanded: false});

    } else if (action.type === TOGGLE_FILE_SELECTED_WAS_CLICKED) {

        const { dbid } = action.payload;
        const change = threewayToggleSelection(entities, dbid);
        entities = deepCopyWithChange(entities, dbid, change);
        entities = propagateSelectionStateUpward(entities, dbid);
        return entities;

    } else if (action.type === TOGGLE_FOLDER_SELECTED_WAS_CLICKED) {

        const { dbid } = action.payload;
        const change = threewayToggleSelection(entities, dbid);
        entities = deepCopyWithChange(entities, action.payload.dbid, change);
        entities = applySelectionStateDownward(entities, dbid, change.selected);
        entities = propagateSelectionStateUpward(entities, dbid);
        return entities;

    } else {
        return entities;

    }
};
