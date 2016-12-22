import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import './index.css';

import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';

import { Node }        from './containers';
import { store }       from './store';

ReactDOM.render(
    <Provider store={store} >
        <Node />
    </Provider>,
    document.getElementById('root')
);
