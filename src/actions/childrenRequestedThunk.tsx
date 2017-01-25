import { Dispatch }                from 'redux';

import { childrenReceived }        from '../actions';
import { childrenRequested }       from '../actions';
import { expandFolderWasClicked }  from '../actions';
import { GenericAction }           from '../types';
import { DatabaseRecord }          from '../types';
import { Selected }                from '../utils';

export const childrenRequestedThunk = (dbid: number) => {
    return (dispatch: Dispatch<GenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: DatabaseRecord) => {
                return {
                    children: undefined,
                    dbid:     dbrecord.id,
                    expanded: false,
                    isfile:   dbrecord.isinstance === 1 ? true : false,
                    name:     dbrecord.name,
                    parent:   dbrecord.childof,
                    selected: Selected.None
                };
            };

            const entities = dbrecords.map(convert);
            dispatch(childrenReceived(entities));
            dispatch(expandFolderWasClicked(dbid));
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
