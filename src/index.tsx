import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { Cell, Grid }  from 'react-mdl';
import { Provider }    from 'react-redux';

import { Tree }        from './components';
import { collections } from './config';
import { store }       from './store';

const colwidth = Math.ceil(12 / collections.length);

const trees = collections.map((collection: string, indexOf: number) => {
    return (
        <Cell key={indexOf} col={colwidth} className="categoryTitleBar">
            <h1>{collection}</h1>
            <Tree collection={collection}/>
        </Cell>
        );
});

ReactDOM.render(
    <Provider store={store} >
        <Grid className={'mdl-cell--12-col category'}>
            {trees}
        </Grid>
    </Provider>,
    document.getElementById('root')
);
