import { INode }                from '../interfaces';
import { CHILDREN_RECEIVED }    from './authorized-actions';

export const childrenReceived = (nodes: INode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { nodes }
    };
};
