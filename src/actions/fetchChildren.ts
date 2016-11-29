
export const fetchChildren = (id: number) => {
    return {
        type: 'CHILDREN_REQUESTED',
        payload: id
    };
};
