import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import './index.css';

import * as React          from 'react';
import * as ReactDOM       from 'react-dom';
import { createStore }     from 'redux';

import { App }             from './components/App';
import { NodeLogic }       from './components/NodeLogic';
import { DatabaseRecord }  from './DatabaseRecord';
import { nodeListReducer } from './reducers/nodeListReducer';

const dbrecord: DatabaseRecord = {
    child_of: 0,
    id: 1,
    is_entity: true,
    is_expandable: true,
    is_instance: false,
    level: 0,
    mention_count: 84027,
    name: 'www.w3.org/2002/07/owl#Thing',
    url: 'http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing'
} as DatabaseRecord;

const nodes: NodeLogic[] = [new NodeLogic(dbrecord, null)];

const store = createStore(nodeListReducer, nodes);

// Every time the state changes, log it
store.subscribe(() => {
    console.log(store.getState());
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
});

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
