export const entityHasChildren = (entities: any, dbid: number): boolean => {
    const exists = entities.hasOwnProperty(dbid);
    if (!exists) {
        console.warn('That \'dbid\' (' + dbid.toString() + ') does not exist in \'entities\'.');
    }
    const hasChildrenProperty = entities[dbid].hasOwnProperty('children');
    if (!hasChildrenProperty) {
        console.warn('\'entities[' + dbid.toString() + ']\' has no property \'children\'.');
    }
    const childrenIsUndefined = entities[dbid].children === undefined;
    if (childrenIsUndefined) {
        console.warn('Property \'children\' on \'entities[' + dbid.toString() + ']\' is \'undefined\'.');
    }
    return exists && hasChildrenProperty && !childrenIsUndefined;
};
