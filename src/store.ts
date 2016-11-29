import { createStore } from 'redux';

import { reducers }    from './reducers/reducers';
import { TStore }      from './types';

// some test data:
import { rootnode }     from './rootnode';

const initstate: TStore = {nodes: rootnode};

export const store = createStore(reducers, initstate);

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});
