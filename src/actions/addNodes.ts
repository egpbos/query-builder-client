import { Node } from '../components/Node';

export const addNodes = (nodes: Node[]| string) => {
    return {
        type: 'ADD_NODES',
        payload: nodes
    };
};
