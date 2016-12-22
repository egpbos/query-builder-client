import { combineReducers }          from 'redux';

import { nodesReducerFactory }      from '../reducers';

export const allreducers = combineReducers ({
    entities:   nodesReducerFactory('entities'),
    events:     nodesReducerFactory('events'),
    sources:    nodesReducerFactory('sources'),
    topics:     nodesReducerFactory('topics')
});
