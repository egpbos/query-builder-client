import { CHILDREN_RECEIVED }   from '../actions';
import { CHILDREN_REQUESTED }  from '../actions';
import { IGenericAction }      from '../interfaces';

const initstate = {
    [1]: {
        dbid: 1,
        isfile: false,
        name: 'root'
    }
};

export const entitiesReducer = (entities: any = initstate, action: IGenericAction) => {

    console.log(new Date().toISOString().slice(11, 19), action.type);

    if (action.type === CHILDREN_RECEIVED) {
        const payloadChildren = action.payload.entities;
        const parentId = payloadChildren[0].parent;

        if (parentId === -1) {
            return Object.assign({}, {[payloadChildren[0].dbid]: payloadChildren[0]});
        } else {

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
        }
    } else if (action.type === CHILDREN_REQUESTED) {
        return entities;
    } else {
        return entities;
    }
};
