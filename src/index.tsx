import * as React       from 'react';
import * as ReactDOM    from 'react-dom';

import { Folder }       from './components';

const state = {
    1: {
        children: [2, 3],
        dbid: 1,
        isinstance: false,
        name: 'node1'
    },
    2: {
        children: [],
        dbid: 2,
        isinstance: false,
        name: 'node2'
    },
    3: {
        children: [],
        dbid: 3,
        isinstance: true,
        name: 'node3'
    }
};

const onClickCheckBox = (dbid: number) => {
    console.log('clicked on checkbox with id ' + dbid.toString());
};

const onClickFile = (dbid: number) => {
    console.log('clicked on file with id ' + dbid.toString());
};

const onClickFolder = (dbid: number) => {
    console.log('clicked on folder with id ' + dbid.toString());
};

const methods = {
    onClickCheckBox,
    onClickFile,
    onClickFolder
};

ReactDOM.render(
    <Folder key={1} dbid={1} state={state} methods={methods} />,
    document.getElementById('root')
);
