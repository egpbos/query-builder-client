import { Action }       from '../actions/Action';
import { INode }        from '../interfaces';
import { IStore }       from '../interfaces';
import { nodesReducer } from './nodesReducer';

const initstate: IStore = {
    nodes: [] as INode[]
};

export const reducers = (state: IStore = initstate, action: Action) => {
    return {
        nodes: nodesReducer(state.nodes, action)
    };
};
