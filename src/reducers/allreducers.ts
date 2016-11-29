import { nodesReducer } from '../reducers';
import { TStore }       from '../types';

const initstate: TStore = {
    nodes: []
};

export const allreducers = (state: TStore = initstate, action: any) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
