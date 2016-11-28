import { TNode } from '../types';

export const addNodes = (nodes: TNode[]) => {
    return {
        type: 'ADD_NODES',
        payload: nodes
    };
};
