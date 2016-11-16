import * as fetch          from 'isomorphic-fetch';
import * as React          from 'react';
import * as ReactDOM       from 'react-dom';
import { createStore }     from 'redux';

import { NodeListRender }  from './components/NodeListRender';
import { Node }            from './Node';
//import { DatabaseRecord }  from './DatabaseRecord';
import { nodeListReducer } from './reducers/nodeListReducer';

// // for example, get the children of node 5
const url: string = 'http://localhost:5000/node/5/children';

const handleTheStatus = (response: Response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error when trying to retrieve the data. ' +
            'status text: \"' + response.statusText + '".');
    }
};

const handleTheData = (dbrecords: any) => {

        const nodes: Node[] = [];
        for (const dbrecord of dbrecords) {
            nodes.push(new Node(dbrecord));
        }

        const store = createStore(nodeListReducer, nodes);
        ReactDOM.render(<NodeListRender nodes={store.getState()} dispatch={store.dispatch} />, document.getElementById('container'));
};

const handleAnyErrors = (err: Error) => {
    console.error('Errors occured.', err.message, err.stack );
};

fetch(url, {method: 'get'})
    .then(handleTheStatus)
    .then(handleTheData)
    .catch(handleAnyErrors);
