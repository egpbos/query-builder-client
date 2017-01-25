import { CHILDREN_RECEIVED }                from '../actions';
import { CHILDREN_REQUESTED }               from '../actions';
import { COLLAPSE_FOLDER_WAS_CLICKED }      from '../actions';
import { EXPAND_FOLDER_WAS_CLICKED }        from '../actions';
import { TOGGLE_FILE_SELECTED_WAS_CLICKED } from '../actions';
import { TOGGLE_FOLDER_SELECTED_WAS_CLICKED } from '../actions';

import { IGenericAction }                   from '../interfaces';
import { Selected }                         from '../Selected';

const deepCopyWithChange = (entities: any, dbid: number, change: any): any => {
        const oldEntity = entities[dbid];
        const newEntity = Object.assign({}, oldEntity, change);
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[dbid]: newEntity});
};

const threewayToggleSelection = (entities: any, dbid: number) => {
    const selected = entities[dbid].selected;
    if (selected === Selected.None) {
        return {selected: Selected.All};
    } else if (selected === Selected.Partial) {
        return {selected: Selected.All};
    } else if (selected === Selected.All) {
        return {selected: Selected.None};
    } else {
        throw new Error('selection has unknown state.');
    }
};

const initstate = {
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

        const change = threewayToggleSelection(entities, action.payload.dbid);
        return deepCopyWithChange(entities, action.payload.dbid, change);

    } else if (action.type === TOGGLE_FOLDER_SELECTED_WAS_CLICKED) {

        const change = threewayToggleSelection(entities, action.payload.dbid);
        return deepCopyWithChange(entities, action.payload.dbid, change);

    } else {
        return entities;

    }
};

// the code snippet below is a function which will be used to traverse the tree
// and determine the state of the parent based on the selection state of me and 
// my siblings

const determineParentSelectedState = (entities: any, dbid: number) => {

    const children = entities[dbid].parent.children;
    const selected = children.map((childId: number) => {
        return entities[childId].selected;
    });

    const allSelected = selected.indexOf(false) === -1;
    const allUnselected = selected.indexOf(true) === -1;

    if (allSelected) {
        return 'selected';
    } else if (allUnselected) {
        return 'unselected';
    } else {
        return 'partial';
    }
};

console.log(determineParentSelectedState);
