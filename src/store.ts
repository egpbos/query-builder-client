import { applyMiddleware }      from 'redux';
import { createStore }          from 'redux';
import thunk                    from 'redux-thunk';

import { rootRequestedThunk }   from './actions';
import { allreducers }          from './reducers';

export const store = createStore(allreducers, applyMiddleware(thunk));

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(rootRequestedThunk());
