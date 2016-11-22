import * as fetch          from 'isomorphic-fetch';
import * as React          from 'react';
import * as ReactDOM       from 'react-dom';
import { createStore }     from 'redux';

import { NodeList }        from './components/NodeList';
import { NodeLogic }       from './components/NodeLogic';
import { nodeListReducer } from './reducers/nodeListReducer';

// // for example, get the children of node 5
const url: string = 'http://localhost:5000/node/5/children';

const store = createStore(nodeListReducer, []);

const handleTheStatus = (response: Response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error when trying to retrieve the data. ' +
            'status text: \"' + response.statusText + '".');
    }
};

const handleTheData = (dbrecords: any) => {

    const nodes: NodeLogic[] = [];
    for (const dbrecord of dbrecords) {
        nodes.push(new NodeLogic(dbrecord));
    }

    store.dispatch({
            type: 'ADD_NODES',
            payload: nodes
        });
};

const handleAnyErrors = (err: Error) => {
    console.error('Errors occured.', err.message, err.stack );
};

fetch(url, {method: 'get'})
    .then(handleTheStatus)
    .then(handleTheData)
    .catch(handleAnyErrors);

ReactDOM.render(
    <NodeList nodes={store.getState()} dispatch={store.dispatch} />,
    document.getElementById('container')
);
