import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { connect }     from 'react-redux';
import { Provider }    from 'react-redux';
import { createStore } from 'redux';

import { Nodes }       from './components/Nodes';
import { reducers }    from './reducers/reducers';

// // some test data:
// import { nodelist }     from './nodelist';
// 
// const initstate: any = nodelist;

const store = createStore(reducers);

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());
});

// Connected Component
const ConnectedNodes = connect(
    Nodes.mapStateToProps,
    Nodes.mapDispatchToProps
)(Nodes);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedNodes />
    </Provider>,
    document.getElementById('root')
);
