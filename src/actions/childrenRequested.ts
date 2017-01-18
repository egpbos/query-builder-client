import { CHILDREN_REQUESTED } from './authorized-actions';

export const childrenRequested = (dbid: number) => {
    return {
        type: CHILDREN_REQUESTED,
        payload: { dbid }
    };
};
