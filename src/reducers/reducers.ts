import { TNode }        from '../types';
import { nodesReducer } from './nodesReducer';

type StateType = {
    nodes: TNode[]
};
const initstate: StateType = {
    nodes: []
};
export const reducers = (state: StateType = initstate, action: any) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
