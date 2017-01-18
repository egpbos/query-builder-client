import * as React                 from 'react';
import * as ReactDOM              from 'react-dom';

import { childrenRequestedThunk } from './actions';
import { Folder }                 from './components';
import { store }                  from './store';

const onClickCheckBox = (dbid: number) => {
    console.log('clicked on checkbox with id ' + dbid.toString());
};

const onClickFile = (dbid: number) => {
    console.log('clicked on file with id ' + dbid.toString());
};

const onClickFolder = (dbid: number) => {
    console.log('clicked on folder with id ' + dbid.toString());
    store.dispatch(childrenRequestedThunk(dbid));
};

const methods = {
    onClickCheckBox,
    onClickFile,
    onClickFolder
};

const entities = store.getState();

ReactDOM.render(
    <Folder key={1} dbid={1} methods={methods} entities={entities} />,
    document.getElementById('root')
);
