import * as React    from 'react';
import * as ReactDOM from 'react-dom';
import { Provider }  from 'react-redux';

import { Tree }      from './components';
import { store }     from './store';

ReactDOM.render(
    <Provider store={store} >
        <Tree />
    </Provider>,
    document.getElementById('root')
);
