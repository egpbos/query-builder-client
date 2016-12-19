import { CHILDREN_REQUESTED } from './authorized-actions';

export const childrenRequested = (id: number) => {
    return {
        type: CHILDREN_REQUESTED,
        payload: { id }
    };
};
