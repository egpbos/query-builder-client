import { CLEAR_QUERY }                  from '../actions';
import { BUILD_QUERY }                  from '../actions';
import { STORE_QUERY }                  from '../actions';
import { OPEN_BUILD_QUERY_DIALOG }      from '../actions';
import { OPEN_CLEAR_QUERY_DIALOG }      from '../actions';
import { CLOSE_BUILD_QUERY_DIALOG }     from '../actions';
import { CLOSE_CLEAR_QUERY_DIALOG }     from '../actions';
import { CHANGE_QUERY_TEXT }            from '../actions';
import { GET_DAEMON_STATUS }            from '../actions';
import { GET_DAEMON_STATUS_RESULT_RECEIVED }    from '../actions';

import { IGenericAction } from '../actions';

import { INode }          from '../components/Node';
import { SelectionState } from '../interfaces';

const initstate: any = {
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
    let entitiesCount : number = 0;
    let eventsCount : number = 0;
    let sourcesCount : number = 0;
    let topicsCount : number = 0;
    state.entities.forEach((entity: any) => {
        entitiesCount += entity.mentioncount;
    });
    state.events.forEach((event: any) => {
        eventsCount += event.mentioncount;
    });
    state.sources.forEach((source: any) => {
        sourcesCount += source.mentioncount;
    });
    state.topics.forEach((topic: any) => {
        topicsCount += topic.mentioncount;
    });

    const min = [entitiesCount, eventsCount, sourcesCount, topicsCount].filter((x) => { return x !== 0; })
    .reduce((a, b) => { return Math.min(a, b); }, Infinity);

    const max = Math.max(entitiesCount, eventsCount, sourcesCount, topicsCount);

    if (min < max) {
        return -min;
    } else {
        return max;
    }
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

export const queryReducer =  (state: any, action: IGenericAction) => {
    if (action.type === CLEAR_QUERY) {
        return Object.assign({}, initstate);
    } else if (action.type === GET_DAEMON_STATUS) {
        return state.queryState;
    } else if (action.type === GET_DAEMON_STATUS_RESULT_RECEIVED) {
        return Object.assign({}, state.queryState, { daemonStatus: action.payload.message });
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

        let mentions = countMentions(newQueryState);
        if (mentions === undefined) {
            mentions = 0;
        }
        newQueryState.selectedMentionCount = mentions;

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
    } else if (action.type === CHANGE_QUERY_TEXT) {
        const newtext = action.payload.newtext;
        return Object.assign({}, state.queryState, {queryString: newtext});
    } else if (action.type === STORE_QUERY) {
        //Needs something done
        return state.queryState;
    } else {
        return state.queryState;
    }
};
