import { applyMiddleware }      from 'redux';
import { createStore }          from 'redux';
import thunk                    from 'redux-thunk';

import { allreducers }          from './reducers';

import { rootRequestedThunk }   from './actions';

import { INode }                from './components/Node';
import { SelectionState }       from './interfaces';

export const store = createStore(allreducers, applyMiddleware(thunk));

function aggregateSelected(nodes : any, node: INode) : INode[] {
    if (node.selectionState === SelectionState.Selected) {
        return [node];
    } else if (node.selectionState === SelectionState.Unselected) {
        return [];
    } else { // selectionState must be partial
        const childIDs = node.children;

        let result : INode[] = [];
        childIDs.forEach((childID) => {
            const childNode = nodes[childID];
            result = result.concat(aggregateSelected(nodes, childNode));
        });

        return result;
    }
}

// whenever the store has changed, print the new state
store.subscribe(() => {
    console.log(store.getState());

    //tryout function to gather selected items    
    const entityNodes = store.getState().entities;
    const root = entityNodes[1];
    if (root) {
        const selectedNodes : INode[] = aggregateSelected(entityNodes, root);

        console.log(selectedNodes);
    }
});

store.dispatch(rootRequestedThunk('entities'));
store.dispatch(rootRequestedThunk('events'));
store.dispatch(rootRequestedThunk('sources'));
store.dispatch(rootRequestedThunk('topics'));
