import { Nodes } from '../types';

export const deepCopyWithChange = (nodes: Nodes, dbid: number, change: any): any => {
        const oldEntity = nodes[dbid];
        const newEntity = Object.assign({}, oldEntity, change);
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, nodes, {[dbid]: newEntity});
};
