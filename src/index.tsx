import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import NodeListRender  from './components/node-list-render';
import Node            from './components/node';


let nodes = [
    new Node({isinstance: false, isentity: true, name: 'firstnode', level: 0, isexpandable: true, isexpanded: false}),
    new Node({isinstance: false, isentity: true, name: 'secondnode', level: 0, isexpandable: true, isexpanded: true}),
    new Node({isinstance: true, isentity: false, name: 'thirdnode', level: 1, isexpandable: false, isexpanded: false}),
    new Node({isinstance: true, isentity: false, name: 'fourthnode', level: 1, isexpandable: false, isexpanded: false}),
    new Node({isinstance: true, isentity: false, name: 'fifthnode', level: 1, isexpandable: false, isexpanded: false}),
    new Node({isinstance: false, isentity: true, name: 'sixthnode', level: 0, isexpandable: true, isexpanded: true}),
    new Node({isinstance: false, isentity: true, name: 'seventhnode', level: 1, isexpandable: true, isexpanded: true}),
    new Node({isinstance: false, isentity: true, name: 'eightnode', level: 2, isexpandable: false, isexpanded: false}),
    new Node({isinstance: true, isentity: false, name: 'ninthnode', level: 2, isexpandable: false, isexpanded: false})
];



ReactDOM.render(<NodeListRender nodes={nodes} />, document.getElementById('container'));
