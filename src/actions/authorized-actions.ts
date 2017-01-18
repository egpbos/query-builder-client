export const CHILDREN_RECEIVED = 'CHILDREN_RECEIVED';
export interface IChildrenReceivedAction {
    type: 'CHILDREN_RECEIVED';
    payload: {
        nodes: any
    };
}

export const CHILDREN_REQUESTED = 'CHILDREN_REQUESTED';
export interface IChildrenRequestedAction {
    type: 'CHILDREN_REQUESTED';
    payload: {
        dbid: number
    };
}

export const EXPAND_BUTTON_WAS_CLICKED = 'EXPAND_BUTTON_WAS_CLICKED';
export interface IExpandButtonWasClickedAction {
    type: 'EXPAND_BUTTON_WAS_CLICKED';
    payload: {
        dbid: number
    };
}
