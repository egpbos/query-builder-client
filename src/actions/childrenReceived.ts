import { CHILDREN_RECEIVED }  from './authorized-actions';

import { INode }              from '../interfaces';

export const childrenReceived = (nodes: INode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { nodes }
    };
};
