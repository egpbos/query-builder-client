import { TNode } from '../types';

export const expandNode = (node: TNode) => {
    return {
        type: 'EXPAND_WAS_CLICKED',
        payload: node
    };
};
