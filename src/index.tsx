import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import { createStore } from 'redux';
import NodeListRender  from './components/node-list-render';
import Node            from './components/node';
import NodeListReducer from './reducers/node-list-reducer';


import * as axios from 'axios';



axios.get('http://localhost:5000/children/1')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

console.error('Do something here to wrangle the data returned by the database into the format that the rest of the React app expects.');


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



let store = createStore(NodeListReducer, nodes);



window.setTimeout(function() {
    store.dispatch({type: 'TOGGLE_ISEXPANDED', payload: 'sixthnode'});
}, 2000);



// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(<NodeListRender nodes={store.getState()} />, document.getElementById('container'));


