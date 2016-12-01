import { Dispatch }                 from 'redux';

import { IGenericAction }           from '../actions';
import { IDatabaseRecord }          from '../interfaces';
import { INode }                    from '../interfaces';
import { childrenReceived }         from './childrenReceived';
import { childrenRequested }        from './childrenRequested';

export const childrenRequestedThunk = (id: number) => {

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
                    childof: dbrecord.child_of,
                    id: dbrecord.id,
                    isentity: dbrecord.is_entity === 1 ? true : false,
                    isleaf: dbrecord.is_expandable === 1 ? false : true,
                    isinstance: dbrecord.is_instance === 1 ? true : false,
                    level: dbrecord.level,
                    mentioncount: dbrecord.mention_count,
                    name: dbrecord.name,
                    url: dbrecord.url,
                    isexpanded: false
                } as INode;
            };
            const nodes: INode[] = dbrecords.map(convert);
            dispatch(childrenReceived(nodes));
        };
        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested(id));

        const url: string = 'http://localhost:5000/node/' + id.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
