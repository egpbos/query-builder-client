import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/react-mdl/extra/material.js';
import './index.css';

import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';

import { Node }        from './components';
import { store }       from './store';

import { Cell, Grid }               from 'react-mdl';

ReactDOM.render(
    <Provider store={store}>
        <Grid>
            <Cell col={3}>
                <Node key={1} table={'entities'} nodeID={1} />
            </Cell>
            <Cell col={3}>
                <Node key={1} table={'events'} nodeID={1} />
            </Cell>
            <Cell col={3}>
                <Node key={1} table={'sources'} nodeID={1} />
            </Cell>
            <Cell col={3}>
                <Node key={1} table={'topics'} nodeID={1} />
            </Cell>
        </Grid>
    </Provider>,
    document.getElementById('root')
);
