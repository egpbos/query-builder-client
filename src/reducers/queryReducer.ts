import { CLEAR_QUERY }          from '../actions';
import { BUILD_QUERY }          from '../actions';
import { STORE_QUERY }          from '../actions';
import { OPEN_BUILD_QUERY_DIALOG }    from '../actions';
import { OPEN_CLEAR_QUERY_DIALOG }    from '../actions';
import { CLOSE_BUILD_QUERY_DIALOG }   from '../actions';
import { CLOSE_CLEAR_QUERY_DIALOG }   from '../actions';

import { IGenericAction } from '../actions';

import { INode }          from '../components/Node';
import { SelectionState } from '../interfaces';

const initstate: any = {
    isQueryDialogOpen: false,
    selectedMentionCount: 0,
    queryString: ''
};

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

function countMentions(state: any) : number {
    let result : number = 0;
    state.entities.forEach((entity: any) => {
        result += entity.mentioncount;
    });
    state.events.forEach((event: any) => {
        result += event.mentioncount;
    });
    state.sources.forEach((source: any) => {
        result += source.mentioncount;
    });
    state.topics.forEach((topic: any) => {
        result += topic.mentioncount;
    });
    return result;
}

function createQueryString(state: any) : string {
    let result : string = '';
    if (state.entities && state.entities.length > 0) {
        result += ' --entityPhrase ';
        state.entities.forEach((entity: any) => {
            result += entity.name + ';';
        });
    }

    if (state.events && state.events.length > 0) {
        result += ' --eventPhrase ';
        state.events.forEach((event: any) => {
            result += event.name + ';';
        });
    }

    if (state.sources && state.sources.length > 0) {
        result += ' --authorPhrase ';
        state.sources.forEach((source: any) => {
            result += source.name + ';';
        });
    }

    if (state.topics && state.topics.length > 0) {
        result += ' --topic ';
        state.topics.forEach((topic: any) => {
            result += topic.name + ';';
        });
    }
    return result;
}

export const queryReducer =  (state: any = initstate, action: IGenericAction) => {
    if (action.type === CLEAR_QUERY) {
        return Object.assign({}, initstate);
    } else if (action.type === BUILD_QUERY) {
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

        newQueryState.selectedMentionCount = countMentions(newQueryState);
        newQueryState.queryString = createQueryString(newQueryState);

        return newQueryState;
    } else if (action.type === OPEN_BUILD_QUERY_DIALOG) {
        return Object.assign({}, state.queryState, {isQueryBuildDialogOpen: true});
    } else if (action.type === OPEN_CLEAR_QUERY_DIALOG) {
        return Object.assign({}, state.queryState, {isQueryClearDialogOpen: true});
    } else if (action.type === CLOSE_BUILD_QUERY_DIALOG) {
        return Object.assign({}, state.queryState, {isQueryBuildDialogOpen: false});
    } else if (action.type === CLOSE_CLEAR_QUERY_DIALOG) {
        return Object.assign({}, state.queryState, {isQueryClearDialogOpen: false});
    } else if (action.type === STORE_QUERY) {
        return state.queryState;
    } else {
        return state.queryState;
    }
};
