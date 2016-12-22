import { BUILD_QUERY }    from '../actions';

import { IGenericAction } from '../actions';

import { INode }          from '../components/Node';
import { SelectionState } from '../interfaces';

const initstate: any = {};

function aggregateSelected(nodes : any, node: INode) : INode[] {
    if (node.selectionState === SelectionState.Selected) {
        return [node];
    } else if (node.selectionState === SelectionState.Unselected) {
        return [];
    } else { // selectionState must be partial
        const childIDs = node.children;

        let result : INode[] = [];
        childIDs.forEach((childID: number) => {
            const childNode = nodes[childID];
            result = result.concat(aggregateSelected(nodes, childNode));
        });

        return result;
    }
}

export const queryReducer =  (state: any = initstate, action: IGenericAction) => {
    if (action.type === BUILD_QUERY) {
        const newQueryState = Object.assign({}, state.queryState);

        if (state.entities[1]) {
            newQueryState.entities = aggregateSelected(state.entities, state.entities[1]);
        }

        if (state.events[1]) {
            newQueryState.events = aggregateSelected(state.events, state.events[1]);
        }

        if (state.sources[1]) {
            newQueryState.sources = aggregateSelected(state.sources, state.sources[1]);
        }

        if (state.entities[1]) {
            newQueryState.topics = aggregateSelected(state.topics, state.topics[1]);
        }

        return newQueryState;
    } else {
        return state.queryState;
    }
};
