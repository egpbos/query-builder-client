import { TStore }       from '../types';
import { nodesReducer } from './nodesReducer';

const initstate: TStore = {
    nodes: []
};

export const reducers = (state: TStore = initstate, action: any) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
