import { INode }          from '../interfaces';
import { ROOT_RECEIVED }  from './authorized-actions';

export const rootReceived = (nodes: INode[]) => {
    return {
        type: ROOT_RECEIVED,
        payload: { nodes }
    };
};
