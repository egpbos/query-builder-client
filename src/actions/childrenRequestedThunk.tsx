import { Dispatch }                             from 'redux';

import { IDatabaseRecord, SelectionState }      from '../interfaces';

import { IGenericAction }                       from '../actions';
import { childrenReceived }                     from './childrenReceived';
import { childrenRequested }                    from './childrenRequested';

import { INode }                                from '../components/Node';

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
                    children:       [],
                    id:             dbrecord.id,
                    isexpanded:     false,
                    isinstance:     dbrecord.isinstance === 1 ? true : false,
                    mentioncount:   dbrecord.mentioncount,
                    name:           dbrecord.name,
                    parent:         dbrecord.childof,
                    selectionState: SelectionState.Unselected
                } as INode;
            };

            const nodes: INode[] = dbrecords.map(convert);
            dispatch(childrenReceived(nodes));
        };

        const handleAnyErrors = (err: Error) => {
            throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(childrenRequested());

        const url: string = 'http://localhost:5000/entities/' + id.toString() + '/children';

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
