import 'whatwg-fetch';

import { ROOT_RECEIVED }              from '../actions';
import { ROOT_REQUESTED }             from '../actions';
import { CHILDREN_RECEIVED }          from '../actions';
import { CHILDREN_REQUESTED }         from '../actions';
import { EXPAND_BUTTON_WAS_CLICKED }  from '../actions';
import { IGenericAction }             from '../actions';

import { INode }   from '../interfaces';

const initstate: INode[] = [];

function recursiveSearchAddChildren(state: INode[], parent: INode, children: INode[]): INode[] {
    return  state.map((node: INode) => {
        if (parent.id === node.id) {
            return Object.assign({}, node, {
                myChildren: children
            });
        } else {
            return Object.assign({}, node, {
                myChildren: recursiveSearchAddChildren(node.myChildren, parent, children)
            });
        }
    });
}

export const nodesReducer = (nodes: INode[] = initstate, action: IGenericAction) => {
    switch (action.type) {
        case ROOT_RECEIVED:
            return action.payload.nodes;
        case ROOT_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case CHILDREN_RECEIVED:
            const payloadParent = action.payload.parent;
            const payloadNodes = action.payload.nodes;

            return recursiveSearchAddChildren(nodes, payloadParent, payloadNodes);
        case CHILDREN_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case EXPAND_BUTTON_WAS_CLICKED:
            const { id } = action.payload;
            return nodes.map((node: INode) => {
                if (id === node.id) {
                    return Object.assign({}, node, {isexpanded: true});
                } else {
                    return node;
                }
            });
        default: {
            return nodes;
        }
    }
};
