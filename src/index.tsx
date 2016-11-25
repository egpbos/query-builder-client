import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import { Provider }     from 'react-redux';
import { createStore }  from 'redux';

import { NodeList }     from './components/NodeList';
import { IStore }       from './interfaces';
import { nodelist }     from './nodelist';
import { nodesReducer } from './reducers/nodesReducer';

const initstate: IStore = {
    nodes: nodelist
};
const store = createStore(nodesReducer, initstate);

ReactDOM.render(
    <Provider store={store}>
        <NodeList nodelist={nodelist} />
    </Provider>,
    document.getElementById('root')
);
