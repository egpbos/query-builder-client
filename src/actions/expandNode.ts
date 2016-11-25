import { Node } from '../components/Node';

export const expandNode = (node: Node | string) => {
    return {
        type: 'EXPAND_WAS_CLICKED',
        payload: node
    };
};
