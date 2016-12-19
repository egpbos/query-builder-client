import { INewNode } from '../components/NewNode';
import { CHILDREN_RECEIVED }  from './authorized-actions';

export const childrenReceived = (id: number, nodes: INewNode[]) => {
    return {
        type: CHILDREN_RECEIVED,
        payload: { id, nodes }
    };
};
