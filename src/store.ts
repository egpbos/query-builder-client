import { applyMiddleware }        from 'redux';
import { createStore }            from 'redux';
import thunk                      from 'redux-thunk';

import { childrenRequestedThunk } from './actions';
import { entitiesReducer }        from './reducers';

export const store = createStore(entitiesReducer, applyMiddleware(thunk));

// // whenever the store has changed, print the new state
// store.subscribe(() => {
//     console.log(store.getState());
// });

const dbidRoot = -1;
store.dispatch(childrenRequestedThunk(dbidRoot));
