import { Dispatch }                             from 'redux';

import { GenericAction }                        from '../../types';
import { textSearchInputChanged }               from './textSearchInputChanged';
import { textSearchResultReceived }             from './textSearchResultReceived';

export interface IDatabaseNumberRecord {
    parentID: number;
}

export const textSearchThunk = (table: string, input: string) => {
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
            const convert = (dbrecord: IDatabaseNumberRecord) => {
                return dbrecord.parentID as number;
            };

            const nodes: number[] = dbrecords.map(convert);
            dispatch(textSearchResultReceived(table, nodes));
        };

        const handleAnyErrors = () => {
            dispatch(textSearchResultReceived(table, []));
            // throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(textSearchInputChanged(table, input));

        const url: string = 'http://localhost:5000/search/' + table + '/' + input;

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
