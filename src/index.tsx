import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import { createStore }  from 'redux';

import { Nodes }        from './components/Nodes';
import { nodesReducer } from './reducers/nodesReducer';

// some test data:
import { nodelist }     from './nodelist';

const initstate: any = nodelist;

const store = createStore(nodesReducer, initstate);

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(
    <Nodes nodes={store.getState()}/>,
    document.getElementById('root')
);
