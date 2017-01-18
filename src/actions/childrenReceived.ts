import { CHILDREN_RECEIVED }    from './authorized-actions';

export const childrenReceived = (entities: any) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { entities }
    };
};
