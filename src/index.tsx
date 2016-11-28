import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';

import { Nodes }       from './components/Nodes';
import { reducers }    from './reducers/reducers';
import { TStore }      from './types';

// some test data:
import { nodelist }     from './nodelist';

const initstate: TStore = {nodes: nodelist};

const store = createStore(reducers, initstate);

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Nodes />
    </Provider>,
    document.getElementById('root')
);
