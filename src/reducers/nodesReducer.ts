import 'whatwg-fetch';

import { TNode } from '../types';
import { TDatabaseRecord } from '../types';

export const nodesReducer = (nodes: TNode[], action: any) => {
    if (nodes === undefined) {
        throw new Error('Initial state is undefined');
    } else {
        switch (action.type) {
            case 'CHILDREN_REQUESTED':
                console.log('in CHILDREN_REQUESTED');
                // beware: side effects happen here:
                const handleTheStatus = (response: Response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error when trying to retrieve the data. ' +
                            'status text: \"' + response.statusText + '".');
                    }
                };
                const handleTheData = (dbrecords: any) => {

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
                        nodes = nodesToBeAdded;
                    } else {
                        // the new state is old state from 0 up to and including
                        // the parent, followed by the nodes that we fetch from
                        // the database, followed by the remaining nodes from 
                        // old state.
                        const begin = nodes.slice(0, parentIndex + 1);
                        const middle = nodesToBeAdded;
                        const end = nodes.slice(parentIndex + 1);
                        nodes = begin.concat(middle).concat(end);
                        console.log(nodes);
                    }
                };
                const handleAnyErrors = (err: Error) => {
                    throw new Error('Errors occured.' + err.message + err.stack);
                };

                const id = action.payload;
                const url: string = 'http://localhost:5000/node/' + id.toString() + '/children';

                fetch(url, {method: 'get'})
                        .then(handleTheStatus)
                        .then(handleTheData)
                        .catch(handleAnyErrors);

                console.error('FIXME this doesn\'t work because it returns ' +
                    'before nodes has been updated with the new data');
                return nodes;

            case 'EXPAND_BUTTON_WAS_CLICKED':
                console.log('in EXPAND_BUTTON_WAS_CLICKED');
                return nodes.map((node: TNode) => {
                    if (action.payload === node.dbrecord.id) {
                        console.log('node = ', node.dbrecord.id);
                        return Object.assign({}, node, {isexpanded: true});
                    } else {
                        return node;
                    }
                });
            default: {
                return nodes;
            }
        }
    }
};
