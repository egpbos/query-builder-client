import * as React     from 'react';
import * as ReactDOM  from 'react-dom';

import { NodeList }   from './components/NodeList';
import { INode }      from './interfaces';

const nodelist: INode[] = [{
    bullet: '#',
    id: 1,
    indent: {paddingLeft: '0px'},
    key: 1,
    name: 'thename',
    nodeclass: 'entity',
    onclick: () => {console.log('blah entity'); }
    }, {
    bullet: '@',
    id: 2,
    indent: {paddingLeft: '0px'},
    key: 2,
    name: 'thename2',
    nodeclass: 'instance',
    onclick: () => {console.log('blah instance'); }
    }, {
    bullet: '%',
    id: 3,
    indent: {paddingLeft: '30px'},
    key: 3,
    name: 'thename2',
    nodeclass: 'instance',
    onclick: () => {console.log('blah instance'); }
}];

ReactDOM.render(
    <NodeList nodelist={nodelist} />,
    document.getElementById('root'));
