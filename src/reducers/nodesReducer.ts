import 'whatwg-fetch';

import { CHILDREN_RECEIVED }         from '../actions/authorized-actions';
import { CHILDREN_REQUESTED }        from '../actions/authorized-actions';
import { EXPAND_BUTTON_WAS_CLICKED } from '../actions/authorized-actions';

import { TNode } from '../types';

const initstate: TNode[] = [];

export const nodesReducer = (nodes: TNode[] = initstate, action: any) => {
    switch (action.type) {
        case CHILDREN_RECEIVED:

            const payloadNodes = action.payload.nodes;

            // who is the parent common to all nodes from payload
            const firstParentId: number = payloadNodes[0].childof;
            const parentIsTheSame = (payloadNode: TNode) => {
                return firstParentId === payloadNode.childof;
            };
            const payloadNodesHaveCommonParent = payloadNodes.every(parentIsTheSame);
            if (payloadNodesHaveCommonParent === false) {
                throw new Error('Not all dbrecords have the same parent.');
            }

            // get position of parent in old state
            const parentIndex = nodes.findIndex((node: TNode) => {
                return node.id === firstParentId;
            });

            if (parentIndex === -1) {
                // overwrite nodes with the list of wrapped database records
                return payloadNodes;
            } else {
                // the new state is old state from 0 up to and including
                // the parent, followed by the nodes that we fetch from
                // the database, followed by the remaining nodes from 
                // old state.
                const begin = nodes.slice(0, parentIndex + 1);
                const middle = payloadNodes;
                const end = nodes.slice(parentIndex + 1);
                return begin.concat(middle).concat(end);
            }
        case CHILDREN_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case EXPAND_BUTTON_WAS_CLICKED:
            const { id } = action.payload;
            return nodes.map((node: TNode) => {
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
