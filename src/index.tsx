import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Provider }    from 'react-redux';

import { Nodes }       from './components/Nodes';
import { store }       from './store';

ReactDOM.render(
    <Provider store={store}>
        <Nodes />
    </Provider>,
    document.getElementById('root')
);
