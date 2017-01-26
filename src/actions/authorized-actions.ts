import { INode } from '../components/Node';

export const ROOT_REQUESTED = 'ROOT_REQUESTED';
export interface IRootRequestedAction {
    type: 'ROOT_REQUESTED';
    payload: {
        table: string
    };
}

export const ROOT_RECEIVED = 'ROOT_RECEIVED';
export interface IRootReceivedAction {
    type: 'ROOT_RECEIVED';
    payload: {
        table: string,
        root: INode
    };
}

export const CHILDREN_REQUESTED = 'CHILDREN_REQUESTED';
export interface IChildrenRequestedAction {
    type: 'CHILDREN_REQUESTED';
    payload: {
        table: string
    };
}

export const CHILDREN_RECEIVED = 'CHILDREN_RECEIVED';
export interface IChildrenReceivedAction {
    type: 'CHILDREN_RECEIVED';
    payload: {
        table: string,
        nodes: any
    };
}

export const EXPAND_BUTTON_WAS_CLICKED = 'EXPAND_BUTTON_WAS_CLICKED';
export interface IExpandButtonWasClickedAction {
    type: 'EXPAND_BUTTON_WAS_CLICKED';
    payload: {
        table: string,
        id: number
    };
}

export const SELECTION_WAS_CLICKED = 'SELECTION_WAS_CLICKED';
export interface ISelectionWasClickedAction {
    type: 'SELECTION_WAS_CLICKED';
    payload: {
        table: string,
        id: number
    };
}

export const CLEAR_QUERY = 'CLEAR_QUERY';
export interface IClearQueryAction {
    type: 'CLEAR_QUERY';
    payload: {
    };
}

export const BUILD_QUERY = 'BUILD_QUERY';
export interface IBuildQueryAction {
    type: 'BUILD_QUERY';
    payload: {
    };
}

export const STORE_QUERY = 'STORE_QUERY';
export interface IStoreQueryAction {
    type: 'STORE_QUERY';
    payload: {
        username: string,
        query: string
    };
}

export const OPEN_BUILD_QUERY_DIALOG = 'OPEN_BUILD_QUERY_DIALOG';
export interface IStoreOpenBuildQueryDialogAction {
    type: 'OPEN_BUILD_QUERY_DIALOG';
    payload: {
    };
}

export const CLOSE_BUILD_QUERY_DIALOG = 'CLOSE_BUILD_QUERY_DIALOG';
export interface IStoreCloseBuildQueryDialogAction {
    type: 'CLOSE_BUILD_QUERY_DIALOG';
    payload: {
    };
}

export const OPEN_CLEAR_QUERY_DIALOG = 'OPEN_CLEAR_QUERY_DIALOG';
export interface IStoreOpenClearQueryDialogAction {
    type: 'OPEN_CLEAR_QUERY_DIALOG';
    payload: {
    };
}

export const CLOSE_CLEAR_QUERY_DIALOG = 'CLOSE_CLEAR_QUERY_DIALOG';
export interface IStoreCloseClearQueryDialogAction {
    type: 'CLOSE_CLEAR_QUERY_DIALOG';
    payload: {
    };
}

export const TEXT_SEARCH = 'TEXT_SEARCH';
export interface ITextSearchAction {
    type: 'TEXT_SEARCH';
    payload: {
        table: string,
        input: string
    };
}

export const TEXT_SEARCH_RESULT_RECEIVED = 'TEXT_SEARCH_RESULT_RECEIVED';
export interface ITextSearchResultReceivedAction {
    type: 'TEXT_SEARCH_RESULT_RECEIVED';
    payload: {
        table: string,
        nodes: number[]
    };
}

export const CHANGE_QUERY_TEXT = 'CHANGE_QUERY_TEXT';
export interface IChangeQueryTextAction {
    type: 'CHANGE_QUERY_TEXT';
    payload: {
        input: string
    };
}

export const GET_DAEMON_STATUS = 'GET_DAEMON_STATUS';
export interface IGetDaemonStatusAction {
    type: 'GET_DAEMON_STATUS';
    payload: {};
}

export const GET_DAEMON_STATUS_RESULT_RECEIVED = 'GET_DAEMON_STATUS_RESULT_RECEIVED';
export interface IGetDaemonStatusResultReceivedAction {
    type: 'GET_DAEMON_STATUS_RESULT_RECEIVED';
    payload: {};
}
