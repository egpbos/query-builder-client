import { CHILDREN_REQUESTED } from './authorized-actions';

export const childrenRequested = (table: string) => {
    return {
        type: CHILDREN_REQUESTED,
        payload: { table }
    };
};
