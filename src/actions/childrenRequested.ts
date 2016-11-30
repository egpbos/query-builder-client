
export const childrenRequested = (id: number) => {
    return {
        type: 'CHILDREN_REQUESTED',
        payload: id
    };
};
