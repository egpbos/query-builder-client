import 'whatwg-fetch';

import { CHILDREN_RECEIVED }         from '../actions/authorized-actions';
import { CHILDREN_REQUESTED }        from '../actions/authorized-actions';
import { EXPAND_BUTTON_WAS_CLICKED } from '../actions/authorized-actions';

import { TNode } from '../types';
import { TDatabaseRecord } from '../types';

const initstate: TNode[] = [];

export const nodesReducer = (nodes: TNode[] = initstate, action: any) => {
    switch (action.type) {
        case CHILDREN_RECEIVED:

            const { dbrecords } = action.payload;

            const convertSqlIntegersToBooleans = (dbrecord: any) => {
                dbrecord.is_entity = dbrecord.is_entity === 1 ? true : false;
                dbrecord.is_instance = dbrecord.is_instance === 1 ? true : false;
            };
            dbrecords.forEach(convertSqlIntegersToBooleans);

            // who is the parent common to all nodes from payload
            const firstParentId: number = dbrecords[0].child_of;
            const parentIsTheSame = (dbrecord: TDatabaseRecord) => {
                return firstParentId === dbrecord.child_of;
            };
            const dbrecordsHaveCommonParent = dbrecords.every(parentIsTheSame);
            if (dbrecordsHaveCommonParent === false) {
                throw new Error('Not all dbrecords have the same parent.');
            }

            // get position of parent in old state
            const parentIndex = nodes.findIndex((node: TNode) => {
                return node.dbrecord.id === firstParentId;
            });

            // wrap the database records as TNodes
            const nodesToBeAdded: TNode[] = [];
            const wrapRecordsAsNodes = (dbrecord: TDatabaseRecord) => {
                nodesToBeAdded.push({
                    dbrecord,
                    isexpanded: false
                });
            };
            dbrecords.map(wrapRecordsAsNodes);

            if (parentIndex === -1) {
                // overwrite nodes with the list of wrapped database records
                return nodesToBeAdded;
            } else {
                // the new state is old state from 0 up to and including
                // the parent, followed by the nodes that we fetch from
                // the database, followed by the remaining nodes from 
                // old state.
                const begin = nodes.slice(0, parentIndex + 1);
                const middle = nodesToBeAdded;
                const end = nodes.slice(parentIndex + 1);
                return begin.concat(middle).concat(end);
            }
        case CHILDREN_REQUESTED:
            console.error('Make a spinner or something');
            return nodes;
        case EXPAND_BUTTON_WAS_CLICKED:
            const { id } = action.payload;
            return nodes.map((node: TNode) => {
                if (id === node.dbrecord.id) {
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
