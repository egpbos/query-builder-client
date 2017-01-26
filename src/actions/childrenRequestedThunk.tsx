import { Dispatch }                from 'redux';

import { childrenReceived }        from '../actions';
import { childrenRequested }       from '../actions';
import { expandFolderWasClicked }  from '../actions';
import { baseurl }                 from '../config';
import { GenericCollectionAction } from '../types';
import { DatabaseRecord }          from '../types';
import { Selected }                from '../types';

export const childrenRequestedThunk = (collection: string, dbid: number) => {
    return (dispatch: Dispatch<GenericCollectionAction>) => {
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
                    children:    undefined,
                    dbid:        dbrecord.id,
                    expanded:    false,
                    isfile:      dbrecord.isinstance === 1 ? true : false,
                    highlighted: false,
                    name:        dbrecord.name,
                    parent:      dbrecord.childof,
                    selected:    Selected.None
                };
            };

            const entities = dbrecords.map(convert);
            dispatch(childrenReceived(collection, entities));
            dispatch(expandFolderWasClicked(collection, dbid));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested(collection, dbid));

        const url: string = baseurl + collection + '/' + dbid.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
