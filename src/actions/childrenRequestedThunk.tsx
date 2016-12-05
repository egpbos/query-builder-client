import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { IDatabaseRecord }          from '../interfaces';
import { INode }                    from '../interfaces';
import { childrenReceived }         from './childrenReceived';
import { childrenRequested }        from './childrenRequested';

export const childrenRequestedThunk = (parent: INode) => {

    return (dispatch: Dispatch<IGenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };
        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: IDatabaseRecord) => {
                return {
                    childof: dbrecord.childof,
                    id: dbrecord.id,
                    isentity: dbrecord.isentity === 1 ? true : false,
                    isleaf: dbrecord.isleaf === 1 ? true : false,
                    isinstance: dbrecord.isinstance === 1 ? true : false,
                    level: dbrecord.level,
                    mentioncount: dbrecord.mentioncount,
                    name: dbrecord.name,
                    url: dbrecord.url,
                    isexpanded: false,
                    parent: parent,
                    myChildren: []
                } as INode;
            };
            const nodes: INode[] = dbrecords.map(convert);
            dispatch(childrenReceived(parent, nodes));
        };
        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested(parent));

        const url: string = 'http://localhost:5000/node/' + parent.id.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
