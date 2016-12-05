import { INode }              from '../interfaces';
import { CHILDREN_RECEIVED }  from './authorized-actions';

export const childrenReceived = (parent: INode, nodes: INode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { parent, nodes }
    };
};
