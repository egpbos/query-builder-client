import { nodesReducer } from './nodesReducer';
import { State }        from '../State';
import { Action }       from '../actions/Action';

const initstate: State = {
    nodes: []
};

export const reducers = (state: State = initstate, action: Action) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
