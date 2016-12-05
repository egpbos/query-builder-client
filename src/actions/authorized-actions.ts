import { INode } from '../interfaces';

export const ROOT_RECEIVED = 'ROOT_RECEIVED';
export interface IRootReceivedAction {
    type: 'ROOT_RECEIVED';
    payload: {
        nodes: INode[]
    };
}

export const ROOT_REQUESTED = 'ROOT_REQUESTED';
export interface IRootRequestedAction {
    type: 'ROOT_REQUESTED';
    payload: {
        parent: null
    };
}

export const CHILDREN_RECEIVED = 'CHILDREN_RECEIVED';
export interface IChildrenReceivedAction {
    type: 'CHILDREN_RECEIVED';
    payload: {
        parent: INode,
        nodes: INode[]
    };
}

export const CHILDREN_REQUESTED = 'CHILDREN_REQUESTED';
export interface IChildrenRequestedAction {
    type: 'CHILDREN_REQUESTED';
    payload: {
        parent: INode
    };
}

export const EXPAND_BUTTON_WAS_CLICKED = 'EXPAND_BUTTON_WAS_CLICKED';
export interface IExpandButtonWasClickedAction {
    type: 'EXPAND_BUTTON_WAS_CLICKED';
    payload: {
        id: number
    };
}
