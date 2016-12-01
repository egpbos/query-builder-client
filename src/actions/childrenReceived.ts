import { CHILDREN_RECEIVED }  from './authorized-actions';

import { TNode }              from '../types';

export const childrenReceived = (nodes: TNode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { nodes }
    };
};
