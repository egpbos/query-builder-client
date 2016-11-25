import 'whatwg-fetch';

import { DatabaseRecord } from '../DatabaseRecord';

export class NodeLogic {
    public dbrecord: DatabaseRecord;
    public isexpanded: boolean;
    public isselected: boolean;

    constructor(
        dbrecord: DatabaseRecord, 
        isexpanded: boolean = false, 
        isselected: boolean = false) {

        if ((dbrecord.is_entity && dbrecord.is_instance) || (!dbrecord.is_entity && !dbrecord.is_instance)) {
            throw new Error('is_entity and is_instance cannot both be false or true');
        } else {
            this.dbrecord = dbrecord;
        }
        this.isexpanded = isexpanded;
        this.isselected = isselected;
    }

    public getClass(): string {
        let nodeclass = '';
        if (this.dbrecord.is_instance) {
            nodeclass += 'instance';
        } else if (this.dbrecord.is_entity) {
            nodeclass += 'entity';
        } else {
            throw new Error('Unknown clause');
        }
        return nodeclass;
    }

    public fetchChildNodes(dispatch: any) {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const nodes: NodeLogic[] = [];
            for (const dbrecord of dbrecords) {
                nodes.push(new NodeLogic(dbrecord));
            }

            const addNodesAction = {
                type: 'ADD_NODES',
                payload: nodes
            };
            console.log('should dispatch ', addNodesAction);
            dispatch(addNodesAction);
        };

        const handleAnyErrors = (err: Error) => {
            console.error('Errors occured.', err.message, err.stack );
        };

        const url: string = 'http://localhost:5000/node/' + this.dbrecord.id.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };

}
