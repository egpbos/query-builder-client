import { Dispatch }           from 'redux';

import { childrenReceived }   from '../actions';
import { childrenRequested }  from '../actions';
import { IGenericAction }     from '../interfaces';
import { IDatabaseRecord }    from '../interfaces';

export const childrenRequestedThunk = (dbid: number) => {
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
                    children:  [],
                    dbid:      dbrecord.id,
                    isfile:    dbrecord.isinstance === 1 ? true : false,
                    name:      dbrecord.name,
                    parent:    dbrecord.childof
                };
            };

            const entities = dbrecords.map(convert);
            dispatch(childrenReceived(entities));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested(dbid));

        const url: string = 'http://localhost:5000/' + 'entities' + '/' + dbid.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
