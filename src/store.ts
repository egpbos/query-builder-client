import { applyMiddleware }         from 'redux';
import { createStore }             from 'redux';
import thunk                       from 'redux-thunk';

import { childrenRequestedThunk }  from './actions';
import { collections }             from './config';
import { queryReducer }            from './reducers';
import { treeReducer }             from './reducers';
import { Nodes }                   from './types';
import { GenericCollectionAction } from './types';
import { Selected }                from './types';

const commonReducerGenerator = (collection = '', commonReducer: any) => {

    const initstate: Nodes = {
        [-1]: {
            children:    undefined,
            dbid:        -1,
            expanded:    false,
            highlighted: false,
            isfile:      false,
            name:        'root',
            parent:      undefined,
            selected:    Selected.None
        }
    };
    return (state: Nodes = initstate, action: GenericCollectionAction) => {
        if (action.collection !== collection) {
            return state;
        }
        return commonReducer(state, action);
    };
};

const collectionReducers: any = {};
collections.forEach((collection: string) => {
    collectionReducers[collection] = commonReducerGenerator(collection, treeReducer);
});

const overallInitstate: any = {
    query: {}
};

/* Function needed to give only _part_ of the state to the individual trees, 
    but the _whole_ state to the queryReducer     
*/
const allReducers = (state: Nodes = overallInitstate, action: GenericCollectionAction) => {
    const result : any = {};
    Object.keys(collectionReducers).forEach((collectionElementKey : any) => {
        result[collectionElementKey] = collectionReducers[collectionElementKey](state[collectionElementKey], action);
    });
    result.query = queryReducer(state, action);
    return result;
};

export const store = createStore(allReducers, applyMiddleware(thunk));

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

const dbidRoot = -1;

collections.map((collection: string) => {
    store.dispatch(childrenRequestedThunk(collection, dbidRoot));
});
