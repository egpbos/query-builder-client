import { queryReducer }         from '../reducers';
import { nodesReducerFactory }  from '../reducers';

import { IGenericAction } from '../actions';

const initstate: any = {
    entities: {},
    events: {},
    sources: {},
    topics: {},
    queryState: {}
};

function combinedReducer(state: any = initstate, action: IGenericAction) {
    return {
        entities:   nodesReducerFactory('entities')(state.entities, action),
        events:     nodesReducerFactory('events')(state.events, action),
        sources:    nodesReducerFactory('sources')(state.sources, action),
        topics:     nodesReducerFactory('topics')(state.topics, action),

        queryState:  queryReducer(state, action)
    };
}

export const allreducers = combinedReducer;
