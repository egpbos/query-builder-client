import { CHILDREN_RECEIVED }                from '../actions';
import { CHILDREN_REQUESTED }               from '../actions';
import { COLLAPSE_FOLDER_WAS_CLICKED }      from '../actions';
import { EXPAND_FOLDER_WAS_CLICKED }        from '../actions';
import { TOGGLE_FILE_SELECTED_WAS_CLICKED } from '../actions';
import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from '../actions';

import { IGenericAction }                   from '../interfaces';

const initstate = {
    [-1]: {
        children: undefined,
        dbid:     -1,
        expanded: false,
        isfile:   false,
        name:     'root',
        parent:   undefined,
        selected: false
    }
};

export const entitiesReducer = (entities: any = initstate, action: IGenericAction) => {

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
            oldParent.children.forEach((child: number) => {
                newParent.children.push(child);
            });
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
        const oldEntity = entities[action.payload.dbid];
        const newEntity = Object.assign({}, oldEntity, {expanded: true});
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[action.payload.dbid]: newEntity});

    } else if (action.type === COLLAPSE_FOLDER_WAS_CLICKED) {
        const oldEntity = entities[action.payload.dbid];
        const newEntity = Object.assign({}, oldEntity, {expanded: false});
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[action.payload.dbid]: newEntity});

    } else if (action.type === TOGGLE_FILE_SELECTED_WAS_CLICKED) {
        const oldEntity = entities[action.payload.dbid];
        const newEntity = Object.assign({}, oldEntity, {selected: !oldEntity.selected});
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[action.payload.dbid]: newEntity});
    } else if (action.type === TOGGLE_FOLDER_SELECTED_WAS_CLICKED) {
        const oldEntity = entities[action.payload.dbid];
        const newEntity = Object.assign({}, oldEntity, {selected: !oldEntity.selected});
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[action.payload.dbid]: newEntity});
    } else {
        return entities;

    }
};
