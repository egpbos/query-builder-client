import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
// import { Provider }    from 'react-redux';
// import { createStore } from 'redux';

import { NodeList }    from './components/NodeList';
import { nodelist }    from './nodelist';

// const initstate = nodelist;
// const store = createStore(reducers, initstate)

ReactDOM.render(
    <NodeList nodelist={nodelist} />,
    document.getElementById('root'));
