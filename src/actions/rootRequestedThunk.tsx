import { Dispatch }                             from 'redux';

import { IGenericAction }                       from '../interfaces';
import { IDatabaseRecord, SelectionState }      from '../interfaces';
import { INode }                                from '../interfaces';
import { rootReceived }                         from './rootReceived';
import { rootRequested }                        from './rootRequested';

export const rootRequestedThunk = () => {

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
                    children:       [],
                    dbid:           dbrecord.id,
                    isexpanded:     false,
                    isinstance:     dbrecord.isinstance === 1 ? true : false,
                    name:           dbrecord.name,
                    parent:         dbrecord.childof,
                    selectionState: SelectionState.Unselected
                } as INode;
            };
            //Since this is the root, we expect only 1 element, and therefore 
            // only take the first element from the array
            const root: INode = dbrecords.map(convert)[0];
            dispatch(rootReceived(root));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(rootRequested());

        const url: string = 'http://localhost:5000/entities/' + '1';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
