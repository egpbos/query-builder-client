import { nodesReducer } from '../reducers';
import { TStore }       from '../types';

export const allreducers = (state: TStore, action: any) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
