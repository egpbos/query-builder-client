import { Dispatch }                             from 'redux';

import { IGenericAction }                       from '../actions';
import { textSearch }                           from './textSearch';
import { textSearchResultReceived }             from './textSearchResultReceived';

export interface IDatabaseNumberRecord {
    myID: number;
}

export const textSearchThunk = (table: string, input: string) => {
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
            const convert = (dbrecord: IDatabaseNumberRecord) => {
                return dbrecord.myID as number;
            };

            const nodes: number[] = dbrecords.map(convert);
            dispatch(textSearchResultReceived(table, nodes));
        };

        const handleAnyErrors = () => {
            dispatch(textSearchResultReceived(table, []));
            // throw new Error('Errors occured. ' + err.message + err.stack);
        };

        dispatch(textSearch(table, input));

        const url: string = 'http://localhost:5000/search/' + table + '/' + input;

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
