export const deepCopyWithChange = (entities: any, dbid: number, change: any): any => {
        const oldEntity = entities[dbid];
        const newEntity = Object.assign({}, oldEntity, change);
        // deep copy of nonprimitive property 'children'
        if (oldEntity.hasOwnProperty('children') && oldEntity.children !== undefined) {
            newEntity.children = [...oldEntity.children];
        }
        return Object.assign({}, entities, {[dbid]: newEntity});
};
